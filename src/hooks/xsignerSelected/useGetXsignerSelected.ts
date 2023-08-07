import { useEffect, useState } from "react";

import { useLocalDbContext } from "@/context/uselocalDbContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";

export function useGetXsignerSelected() {
  const { xsignerSelectedRepository } = useLocalDbContext();
  const [xSignerSelected, setXsignerSelected] =
    useState<SignatoriesAccount | null>(null);

  useEffect(() => {
    setXsignerSelected(xsignerSelectedRepository.getAccount());
  }, [xsignerSelectedRepository]);

  return { xSignerSelected };
}
