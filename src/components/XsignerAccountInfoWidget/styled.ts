import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AccountInfoWrapper = styled(Box)<
  BoxProps & { networkcolor: string | undefined }
>(({ theme, networkcolor }) => {
  const _networkColor = networkcolor
    ? networkcolor
    : theme.palette.background.default;
  return {
    backgroundColor: theme.palette.background.default,
    minHeight: theme.spacing(14),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(0, 0, 1, 1),
    background: `linear-gradient(to bottom, ${theme.palette.common.black}, ${theme.palette.background.default} 75%, ${_networkColor} 110% )`,
  };
});
