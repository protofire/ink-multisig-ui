import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";

import { getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useModalBehaviour } from "@/hooks/useModalBehaviour";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

import BaseConfirmationDialog from "../BaseConfirmationDialog";

const message =
  "This ink account exists on {networkName} network. Do you want to \
  change the network to be able to see the account?";

export default function NetworkConfirmationModal() {
  const { network, setNetwork } = usePolkadotContext();
  const { xSignerSelected } = useGetXsignerSelected();
  const router = useRouter();
  const { name: networkName } = getChain(xSignerSelected?.networkId);
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    router.replace(ROUTES.Welcome);
  };

  const handleConfirm = () => {
    xSignerSelected && setNetwork(xSignerSelected.networkId);
    setOpen(false);
  };

  useEffect(() => {
    if (!network || !xSignerSelected) return;
    if (network !== xSignerSelected.networkId) {
      setOpen(true);
    }
  }, [network, xSignerSelected]);
  const { closeModal, isOpen, openModal } = useModalBehaviour();

  return (
    <BaseConfirmationDialog
      title="Change Network confirmation"
      message={message}
      open={isOpen}
      onClose={closeModal}
      onConfirm={() => console.log}
    />
  );
}
