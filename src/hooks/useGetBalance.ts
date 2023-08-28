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
      totalBalance: _balance?.freeBalance.add(_balance.reservedBalance),
    }),
    [_balance?.freeBalance, _balance?.reservedBalance]
  );
  const api = useNetworkApi();

  useEffect(() => {
    if (!api?.apiPromise) return;

    setIsLoading(true);
    const freeBalance = planckToDecimalFormatted(
      balanceWithoutFormat?.freeBalance,
      {
        significantFigures: 4,
        api: api?.apiPromise,
      }
    );
    const reservedBalance = planckToDecimalFormatted(
      balanceWithoutFormat?.reservedBalance,
      {
        significantFigures: 4,
        api: api?.apiPromise,
      }
    );

    setBalance({ freeBalance, reservedBalance });
    setIsLoading(false);
  }, [api?.apiPromise, balanceWithoutFormat]);

  return { balance, isLoading };
}
