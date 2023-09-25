import { Box, Grid, Typography } from "@mui/material";

import { AccountAvatar } from "@/components/AddressAccountSelect/AccountAvatar";
import CopyButton from "@/components/common/CopyButton";
import OpenNewTabButton from "@/components/common/OpenNewTabButton";

import { DEFAULT_COL_WIDTH, StyledTypography } from "./styled";

type Props = {
  address: string;
  name: string;
  mockUrl: string;
};

export const SendDetail = (data: Props) => {
  const { address, name, mockUrl } = data;
  return (
    <Grid container>
      <Grid item {...DEFAULT_COL_WIDTH.name}>
        <StyledTypography>Created at:</StyledTypography>
      </Grid>
      <Grid item {...DEFAULT_COL_WIDTH.value}>
        <Typography>Sep 10, 2023 - 12:53:00 PM</Typography>
      </Grid>
      <Grid item {...DEFAULT_COL_WIDTH.name}>
        <StyledTypography>Created by: </StyledTypography>
      </Grid>
      <Grid
        item
        {...DEFAULT_COL_WIDTH.value}
        sx={{ margin: "22px 0px", display: "flex" }}
      >
        <AccountAvatar
          address={address}
          name={name}
          truncateLenght={8}
        ></AccountAvatar>
        <Box sx={{ marginTop: "20px", marginLeft: "15px" }}>
          <CopyButton text={address} />
          <OpenNewTabButton text={mockUrl} />
        </Box>
      </Grid>
      <Grid item {...DEFAULT_COL_WIDTH.name}>
        <StyledTypography>Transaction hash:</StyledTypography>
      </Grid>
      <Grid item {...DEFAULT_COL_WIDTH.value}>
        <Typography>BFGSBWmxadVYDrEG7zHIJ</Typography>
      </Grid>
    </Grid>
  );
};
