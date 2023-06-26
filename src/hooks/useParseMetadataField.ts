import { useEffect, useState, useCallback, useMemo, Dispatch, SetStateAction } from 'react';
import { MetadataManager } from '@/services/substrate/MetadataManager';
import { useApi } from 'useink';
import { FileState } from '@/domain/FileState';
import { MetadataState } from '@/domain';
import { readerAsFileState } from '@/utils/fileReader';

type OnChange = Dispatch<SetStateAction<File | null>>
type OnRemove = () => void;

interface Options {
  isWasmRequired?: boolean;
}

interface Callbacks {
  onChange?: OnChange;
  onRemove?: OnRemove;
}

export interface UseMetadata {
  metadata: MetadataState
  onRemove: () => void;
  metadataFile: File | undefined; 
  onChange: (_file: File) => void;
}

const metadataManager = new MetadataManager();

export function useParseMetadataField(
  initialValue?: Record<string, unknown>,
  options: Options & Callbacks = {}
): UseMetadata {
  const [metadataFile, setMetadataFile] = useState<File | undefined>();
  const apiProvider = useApi();
  const apiPromise = useMemo(() => apiProvider?.api, [apiProvider?.api])
  const { isWasmRequired = false, ...callbacks } = options;
  const [metadata, setMetadata] = useState<MetadataState>(metadataManager.EMPTY);

  const onChange = useCallback(async (file: File) => {
    setMetadataFile(file)
    const fileState = await readerAsFileState(file)
    const newState = metadataManager.parseFile(fileState, isWasmRequired, apiPromise);

    setMetadata(newState)
  }, [apiPromise, isWasmRequired])
  
  const onRemove = useCallback(() => {
    setMetadataFile(undefined)
    setMetadata(metadataManager.EMPTY)
  }, [setMetadataFile])


  // const onChange = useCallback( async (file: File): Promise<void> => {
  //   const fileState = await convertFileToFileState(file)
  //   const newState = metadataManager.parseFile(fileState, isWasmRequired, apiPromise);
  //   setState(newState);
  //   callbacks.onChange && callbacks.onChange(fileState, newState.source);
  // }, [isWasmRequired, apiPromise, callbacks]);

  // const onRemove = useCallback((): void => {
  //   setState(metadataManager.EMPTY);
  //   callbacks.onChange && callbacks.onChange(undefined);
  //   callbacks.onRemove && callbacks.onRemove();
  // }, [callbacks]);

  useEffect(() => {
    metadataFile && onChange(metadataFile)
  }, [metadataFile, onChange]);

  return {
    metadata,
    metadataFile,
    onChange: setMetadataFile,
    onRemove, 
  };
}
