import { useCallback, useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { XsignerAccountEvents } from "@/domain/events/XsignerAccountEvents";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";

import { useEventListenerCallback } from "../useEventListenerCallback";

export function useGetXsignerSelected() {
  const { xsignerSelectedRepository, signatoriesAccountRepository } =
    useLocalDbContext();
  const { network } = usePolkadotContext();
  const [xSignerSelected, setXsignerSelected] =
    useState<SignatoriesAccount | null>(null);

  const getAccount = useCallback(async () => {
    const addressAccount = xsignerSelectedRepository.getAccount();

    const account =
      addressAccount &&
      (await signatoriesAccountRepository.getSignatoryAccount(
        network,
        addressAccount
      ));

    if (account) {
      setXsignerSelected(account);
    }
  }, [network, signatoriesAccountRepository, xsignerSelectedRepository]);

  useEffect(() => {
    getAccount();
  }, [getAccount, signatoriesAccountRepository]);

  useEventListenerCallback(
    [
      XsignerAccountEvents.onChangeAccount,
      XsignerAccountEvents.blockchainAccountsReloaded,
    ],
    () => getAccount()
  );

  return { xSignerSelected };
}
