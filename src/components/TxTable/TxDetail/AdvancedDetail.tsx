import { Box, Grid } from "@mui/material";

import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";

import { CustomGridItem } from "./styled";

type Props = { data: TransactionProposedItemUi };

export const AdvancedDetail = ({ data }: Props) => {
  const DATA = {
    Method: data.selector,
    Name: data.methodName ?? "-",
    "Raw args": data.args ?? "-",
    Value: data.value,
    "Creation block #": data.creationBlockNumber,
    "Last update block #": data.lastUpdatedBlockNumber,
  };

  return (
    <Grid container>
      {Object.entries(DATA).map(([name, value], index) => {
        return (
          <Box sx={{ width: "100%", display: "flex" }} key={index}>
            <CustomGridItem colType="name">{`${name}:`}</CustomGridItem>
            <CustomGridItem colType="value">{value as string}</CustomGridItem>
          </Box>
        );
      })}
    </Grid>
  );
};
