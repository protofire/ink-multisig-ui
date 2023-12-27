import React from "react";
import { ChainId } from "useink/dist/chains";

import { SignatoriesAccount } from "@/domain/SignatoriesAccount";

interface Props {
  xsignerAccount: SignatoriesAccount;
  network: ChainId;
}

export const TransactionHistory: React.FC<Props> = ({
  xsignerAccount,
  network,
}) => {
  return <>History</>;
};
