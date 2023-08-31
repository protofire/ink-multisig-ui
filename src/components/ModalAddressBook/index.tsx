import { Box, ButtonBase, Modal, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

import { getChain } from "@/config/chain";
import { ChainId } from "@/services/useink/types";

import NetworkBadge from "../NetworkBadge";
import { ModalStyled, ModalTypography } from "./styled";

type Props = {
  open: boolean;
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose: () => void;
  network: ChainId | undefined;
};
export function ModalAddressBook({
  open,
  handleOnChange,
  handleSubmit,
  onClose,
  network,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleSubmit(e);
    onClose();
  };
  const chain = getChain(network);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalStyled>
        <ModalTypography id="modal-modal-title" variant="h3">
          Create entry
        </ModalTypography>
        <TextField
          required
          id="name"
          label="Name"
          name="name"
          placeholder={"magnificent-astar"}
          onChange={handleOnChange}
        />
        <TextField
          sx={{
            marginTop: "2rem",
          }}
          required
          id="address"
          label="Address"
          name="address"
          onChange={handleOnChange}
          placeholder={"5FpWVjTfDzqwzzc6kPZzHQFEsfikd8JCVnEUkBcXkQKWYw8B"}
        />
        <Box
          sx={{
            display: "flex",
            marginTop: "1rem",
            "& span": {
              marginRight: "0.5rem",
            },
          }}
        >
          <span> This address is available on </span>{" "}
          <NetworkBadge
            logo={chain?.logo.src}
            description={chain?.logo.alt}
            logoSize={{ width: 14, height: 14 }}
            name={chain.name}
            showTooltip={false}
          ></NetworkBadge>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <ButtonBase onClick={onClose}> Cancel </ButtonBase>
          <ButtonBase onClick={handleClick}> Save </ButtonBase>
        </Box>
      </ModalStyled>
    </Modal>
  );
}
