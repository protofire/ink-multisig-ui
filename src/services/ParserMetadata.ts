import { Abi, ApiPromise, FileState, MetadataState, Validation } from 'types';

interface Options {
  isWasmRequired?: boolean;
}

interface DeriveOptions extends Options {
  name?: string;
}

class MetadataManager {
  private EMPTY: MetadataState = {
    isError: false,
    isSupplied: false,
    isValid: false,
    name: '',
    message: null,
  };

  private utf8decoder = new TextDecoder();

  deriveFromJson(
    options: DeriveOptions,
    source?: Record<string, unknown>,
    api?: ApiPromise | null
  ): MetadataState {
    if (!source) {
      return this.EMPTY;
    }

    let value: Abi | undefined = undefined;

    try {
      value = new Abi(source, api?.registry.getChainProperties());

      const name = options.name || value.info.contract.name.toString();

      return {
        source,
        name,
        value,
        isSupplied: true,
        ...this.validate(value, options),
      };
    } catch (e) {
      console.error(e);

      return {
        source,
        name: '',
        value,
        isSupplied: true,
        ...this.validate(value, options),
      };
    }
  }

  validate(metadata: Abi | undefined, { isWasmRequired }: Options): Validation {
    if (!metadata) {
      return {
        isValid: false,
        isError: true,
        message:
          'Invalid contract file format. Please upload the generated .contract bundle for your smart contract.',
      };
    }

    const wasm = metadata.info.source.wasm;
    const isWasmEmpty = wasm.isEmpty;
    const isWasmInvalid = !WebAssembly.validate(wasm);

    if (isWasmRequired && (isWasmEmpty || isWasmInvalid)) {
      return {
        isValid: false,
        isError: true,
        message: 'This contract bundle has an empty or invalid WASM field.',
      };
    }

    return {
      isValid: true,
      isError: false,
      isSuccess: true,
      message: isWasmRequired ? 'Valid contract bundle!' : 'Valid metadata file!',
    };
  }

  parseFile(file: FileState, isWasmRequired: boolean, api?: ApiPromise | null): MetadataState {
    try {
      const json = JSON.parse(this.utf8decoder.decode(file.data)) as Record<string, unknown>;
      const name = file.name.replace('.contract', '').replace('.json', '').replace('_', ' ');

      return this.deriveFromJson({ isWasmRequired, name }, json, api);
    } catch (error) {
      console.error(error);

      return {
        ...this.EMPTY,
        message: 'This contract file is not in a valid format.',
        isError: true,
        isSupplied: true,
        isValid: false,
      };
    }
  }
}
