import fs from 'fs-extra'
import path from 'path'
import { MetadataManager } from '@/services/MetadataManager';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { FileState } from '@/domain/FileState';
import { ROCOCO_RPC } from '../setupTests';
import { Abi } from '@polkadot/api-contract';

async function getFileState(filePath: string): Promise<FileState> {
  const fileBuffer = await fs.readFile(filePath);
  const name = path.basename(filePath);
  const size = fs.statSync(filePath).size;

  return {
    data: new Uint8Array(fileBuffer),
    name,
    size,
  };
}

const filePath = 'tests/data/metadata_5D3HHxVrJ5P9Zosmf7dQmzM5soBF3Vw2LGCdczL9ivc5dLYy.json'

describe('MetadataManager', () => {
  let metadataManager: MetadataManager;
  let mockApi: jest.Mocked<ApiPromise>;
  let realApi : ApiPromise | null = null
  let metadataFile: FileState
  const runRealApiTests = process.env.RUN_REAL_API_TESTS === 'true'

  beforeAll(async () => {
    metadataFile = await getFileState(filePath)      
    if (!runRealApiTests) {
      return;
    }

    const provider = new WsProvider(ROCOCO_RPC);
    realApi = await ApiPromise.create({ provider });
  });

  afterAll(() => {
    if (realApi) {
      realApi.disconnect();
    }
  });


  beforeEach(() => {
    metadataManager = new MetadataManager();

    // Mock ApiPromise
    mockApi = {
      registry: {
        getChainProperties: jest.fn(),
      },
    } as unknown as jest.Mocked<ApiPromise>;
  });


  it('should parseFile and get ABI', async () => {
    const result = metadataManager.parseFile(metadataFile, false, mockApi);

    expect(result.value).toBeInstanceOf(Abi);
  });

  it(
    runRealApiTests 
       ? 'should parseFile with real ApiPromise'
       : 'will skip deriveFromJson with real ApiPromise',
     async () => {
     if(!runRealApiTests) return
 
     const result = metadataManager.parseFile(metadataFile, false, realApi);
 
     expect(result.value).toBeInstanceOf(Abi);
   });
 
});
