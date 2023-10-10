import { useEffect, useMemo, useState } from "react";
import { useBalance } from "useink";

import { planckToDecimalFormatted } from "@/services/useink/substrate/parseUnit";

import { useNetworkApi } from "./useNetworkApi";

export interface XsignerBalance {
  freeBalance?: string;
  reservedBalance?: string;
  totalBalance?: string;
}

export function useGetBalance(address: string | undefined) {
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<XsignerBalance>();
  const { apiPromise: api, network } = useNetworkApi();
  const _balance = useBalance({ address }, network);
  const balanceWithoutFormat = useMemo(
    () => ({
      freeBalance: _balance?.freeBalance,
      reservedBalance: _balance?.reservedBalance,
      totalBalance: _balance?.freeBalance.add(_balance.reservedBalance),
    }),
    [_balance?.freeBalance, _balance?.reservedBalance]
  );
  useEffect(() => {
    if (!api) return;

    setIsLoading(true);
    const freeBalance = planckToDecimalFormatted(
      balanceWithoutFormat?.freeBalance,
      {
        significantFigures: 4,
        api,
      }
    );
    const reservedBalance = planckToDecimalFormatted(
      balanceWithoutFormat?.reservedBalance,
      {
        significantFigures: 4,
        api,
      }
    );

    const totalBalance = planckToDecimalFormatted(
      balanceWithoutFormat?.totalBalance,
      {
        significantFigures: 4,
        api: api,
      }
    );

    setBalance({ freeBalance, reservedBalance, totalBalance });
    setIsLoading(false);
  }, [api, balanceWithoutFormat]);

  return { balance, isLoading };
}
