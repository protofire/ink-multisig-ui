import PeopleIcon from "@mui/icons-material/People";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import Identicon from "@polkadot/react-identicon";

import { CHAINS_ALLOWED } from "@/config/chain";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { truncateAddress } from "@/utils/formatString";

type Props = Partial<SignatoriesAccount> & {
  networkName: (typeof CHAINS_ALLOWED)[number]["name"];
};

export function XsignerAccountAvatar({ address, name, networkName }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={"column"}
      height="100%"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          gap="0.2rem"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar>
            <Identicon value={address} size={32} theme="jdenticon" />
          </Avatar>
          <Tooltip title="Threshold" arrow>
            <Box display="flex" flexDirection="column">
              <PeopleIcon fontSize="small" color="primary" />
              <Typography
                variant="caption"
                color="primary"
                sx={{ margin: "-4px 0" }}
              >
                2/4
              </Typography>
            </Box>
          </Tooltip>
        </Box>
        <Box marginLeft={1}>
          <Typography variant="caption" color="white">
            {name}
          </Typography>
          <Typography color="white">{truncateAddress(address, 4)}</Typography>
          <Typography color="white">124,09 AST</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" color="white">
          {networkName}
        </Typography>
      </Box>
    </Box>
  );
}
