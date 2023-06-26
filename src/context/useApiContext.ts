import { RococoContractsTestnet } from '@/config/chain';
import { useApi, useWallet } from 'useink';

export const useApiContext = () => {
    const apiProvider = useApi(RococoContractsTestnet.id);
    const apiPromise = apiProvider?.api
    const { accounts } = useWallet()  

    return {apiPromise, apiProvider, accounts}
}