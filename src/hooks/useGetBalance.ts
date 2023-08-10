import { useEffect, useMemo, useState } from "react";
import { useBalance } from "useink";

import { planckToDecimalFormatted } from "@/services/useink/substrate/parseUnit";

import { useNetworkApi } from "./useNetworkApi";

interface XsignerBalance {
  freeBalance?: string;
  reservedBalance?: string;
}

export function useGetBalance(address: string | undefined) {
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<XsignerBalance>();
  const _balance = useBalance({ address });
  const balanceWithoutFormat = useMemo(
    () => ({
      freeBalance: _balance?.freeBalance,
      reservedBalance: _balance?.reservedBalance,
    }),
    [_balance?.freeBalance, _balance?.reservedBalance]
  );
  const api = useNetworkApi();

  useEffect(() => {
    if (!api?.api) return;

    setIsLoading(true);
    const freeBalance = planckToDecimalFormatted(
      balanceWithoutFormat?.freeBalance,
      {
        significantFigures: 4,
        api: api?.api,
      }
    );
    const reservedBalance = planckToDecimalFormatted(
      balanceWithoutFormat?.reservedBalance,
      {
        significantFigures: 4,
        api: api?.api,
      }
    );

    setBalance({ freeBalance, reservedBalance });
    setIsLoading(false);
  }, [api?.api, balanceWithoutFormat]);

  return { balance, isLoading };
}
