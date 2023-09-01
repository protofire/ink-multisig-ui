import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
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
  handleClose: () => void;
};
export function ModalAddressBook({
  open,
  handleOnChange,
  handleSubmit,
  onClose,
  network,
  handleClose,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleSubmit(e);
    onClose();
  };
  const chain = getChain(network);
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalStyled>
        <ModalTypography id="modal-modal-title" variant="h3">
          Create entry
        </ModalTypography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
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
            logoSize={{ width: 16, height: 16 }}
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
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Save
          </Button>
        </Box>
      </ModalStyled>
    </Modal>
  );
}
