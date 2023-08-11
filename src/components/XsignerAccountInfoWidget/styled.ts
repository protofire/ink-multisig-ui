import { Box, BoxProps, styled } from "@mui/material";

export const AccountInfoWrapper = styled(Box)<
  BoxProps & { networkcolor: string | undefined }
>(({ theme, networkcolor }) => {
  const _networkColor = networkcolor
    ? networkcolor
    : theme.palette.background.default;
  return {
    backgroundColor: theme.palette.background.default,
    minHeight: theme.spacing(16),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${_networkColor} 100%, ${_networkColor} )`,
  };
});
