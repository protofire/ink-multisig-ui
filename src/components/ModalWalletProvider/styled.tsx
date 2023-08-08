import { styled } from "@mui/material";

import {
  LoadingButton,
  LoadingButtonProps,
} from "@/components/common/LoadingButton";

export const StyledConnectButton = styled(LoadingButton)<LoadingButtonProps>(
  () => ({
    backgroundColor: "#BA0061",
    color: "#FFFF",
    width: "115px",
  })
);
