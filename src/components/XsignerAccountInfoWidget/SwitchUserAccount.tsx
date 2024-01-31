import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import { IconButton } from "@mui/material";

import { UseModalBehaviour } from "@/hooks/common/useModalBehaviour";

type Props = UseModalBehaviour;

export function SwitchUserAccount({ isOpen, openModal, closeModal }: Props) {
  return (
    <IconButton
      id="basic-button"
      aria-controls={isOpen ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={isOpen ? "true" : undefined}
      onClick={isOpen ? closeModal : openModal}
      aria-label="wallet-menu"
    >
      <ChangeCircleRoundedIcon
        fontSize="large"
        color="primary"
        sx={{
          transition: "0.6s",
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
          "&.MuiIconButton-root:hover": {
            scale: "1.1",
            backgroundColor: "transparent" /* , rotate: "90deg" */,
          },
        }}
      />
    </IconButton>
  );
}
