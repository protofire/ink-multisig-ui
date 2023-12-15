import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { XsignerAccountEvents } from "@/domain/events/XsignerAccountEvents";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";

import { useEventListenerCallback } from "../useEventListenerCallback";

export function useGetXsignerSelected() {
  const { xsignerSelectedRepository } = useLocalDbContext();
  const [xSignerSelected, setXsignerSelected] =
    useState<SignatoriesAccount | null>(null);

  useEffect(() => {
    setXsignerSelected(xsignerSelectedRepository.getAccount());
  }, [xsignerSelectedRepository]);

  useEventListenerCallback(XsignerAccountEvents.onChangeAccount, () =>
    setXsignerSelected(xsignerSelectedRepository.getAccount())
  );

  return { xSignerSelected };
}
