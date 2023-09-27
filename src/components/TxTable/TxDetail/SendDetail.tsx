import { Box, Grid } from "@mui/material";

import { AccountAvatar } from "@/components/AddressAccountSelect/AccountAvatar";
import CopyButton from "@/components/common/CopyButton";
import OpenNewTabButton from "@/components/common/OpenNewTabButton";

import { CustomGridItem } from "./styled";

type Props = {
  address: string;
  name: string;
  mockUrl: string;
};

export const SendDetail = (data: Props) => {
  const { address, name, mockUrl } = data;
  return (
    <Grid container>
      <CustomGridItem colType="name">Created at:</CustomGridItem>
      <CustomGridItem colType="value">
        Sep 10, 2023 - 12:53:00 PM
      </CustomGridItem>
      <CustomGridItem colType="name">Created by:</CustomGridItem>
      <CustomGridItem
        colType="value"
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
      </CustomGridItem>
      <CustomGridItem colType="name">Transaction hash:</CustomGridItem>
      <CustomGridItem colType="value">BFGSBWmxadVYDrEG7zHIJ</CustomGridItem>
    </Grid>
  );
};
