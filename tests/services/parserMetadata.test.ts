import fs from 'fs-extra'
// import { ParserMetadata } from '@services/ParserMetadata';

describe('ParserMetadata', () => {
  it('should handle onChange correctly', async () => {
    const metadataFile = await fs.readFileSync(
        'tests/data/metadata_5D3HHxVrJ5P9Zosmf7dQmzM5soBF3Vw2LGCdczL9ivc5dLYy.json',
        'utf8'
      )
  
    // const api = { /* ... some api ... */ };
    // const options = { onChange: jest.fn(), onRemove: jest.fn() };
    // const parser = new ParserMetadata(api, options);

    // const file = { /* ... some file ... */ };
    // const result = parser.onChange(file);

    // expect(result).toEqual({ /* ... expected result ... */ });
    // expect(options.onChange).toHaveBeenCalledWith(file, { /* ... expected json ... */ });
  });

  it('should handle onRemove correctly', () => {
//     const api = { /* ... some api ... */ };
//     const options = { onChange: jest.fn(), onRemove: jest.fn() };
//     const parser = new ParserMetadata(api, options);

//     const result = parser.onRemove();

//     expect(result).toEqual({ /* ... expected result ... */ });
//    expect(options.onChange).toHaveBeenCalledWith(undefined);
//     expect(options.onRemove).toHaveBeenCalled();
  });
});

// import { MetadataManager } from './MetadataManager';
// import { ApiPromise, WsProvider } from '@polkadot/api';

// describe('MetadataManager with real ApiPromise', () => {
//   let metadataManager: MetadataManager;
//   let api: ApiPromise;

//   beforeAll(async () => {
//     if (!process.env.RUN_ROCOCO_TESTS) {
//       return;
//     }

//     const provider = new WsProvider('wss://rococo-rpc.polkadot.io');
//     api = await ApiPromise.create({ provider });
//   });

//   beforeEach(() => {
//     metadataManager = new MetadataManager();
//   });

//   (process.env.RUN_ROCOCO_TESTS ? test : test.skip)('deriveFromJson uses real ApiPromise', async () => {
//     const source = { /* your source object */ };
//     const options = { isWasmRequired: false, name: 'test' };

//     const result = await metadataManager.deriveFromJson(options, source, api);

//     expect(result).toBeDefined();
//     // Add more assertions based on what you expect from the real ApiPromise
//   });
// });
// ### 2da Otra forma 
// (process.env.SKIP_REAL_API_TESTS ? test.skip : test)('deriveFromJson with real ApiPromise', async () => {
//     // Setup
//     const provider = new WsProvider('wss://rococo-rpc.polkadot.io');
//     const realApi = await ApiPromise.create({ provider });

//     // Exercise
//     const result = metadataManager.deriveFromJson({ isWasmRequired: false }, {}, realApi);

//     // Verify
//     expect(result).toBeDefined();
//   });
//   

// ### 3ra Otra forma 
// import { MetadataManager } from './MetadataManager';
// import { ApiPromise, WsProvider } from '@polkadot/api';

// describe('MetadataManager', () => {
//   let metadataManager: MetadataManager;
//   let mockApi: jest.Mocked<ApiPromise>;

//   beforeEach(() => {
//     metadataManager = new MetadataManager();

//     // Mock ApiPromise
//     mockApi = {
//       registry: {
//         getChainProperties: jest.fn(),
//       },
//     } as unknown as jest.Mocked<ApiPromise>;
//   });

//   it('should derive from JSON', () => {
//     const source = { /* your source object */ };
//     const options = { isWasmRequired: false, name: 'test' };

//     mockApi.registry.getChainProperties.mockReturnValue(/* your chain properties */);

//     const result = metadataManager.deriveFromJson(options, source, mockApi);

//     // Add your assertions here
//     expect(result).toBeDefined();
//   });

//   if (process.env.RUN_REAL_API_TESTS === 'true') {
//     it('should derive from JSON with real ApiPromise', async () => {
//       const provider = new WsProvider('wss://rpc.polkadot.io');
//       const api = await ApiPromise.create({ provider });

//       const source = { /* your source object */ };
//       const options = { isWasmRequired: false, name: 'test' };

//       const result = metadataManager.deriveFromJson(options, source, api);

//       // Add your assertions here
//       expect(result).toBeDefined();
//     });
//   }
// });