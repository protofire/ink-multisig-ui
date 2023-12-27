import { Box, Grid } from "@mui/material";

import { ExtendedDataType } from "@/domain/repositores/ITxQueueRepository";

import { CustomGridItem } from "./styled";

type Props = { data: ExtendedDataType };

export const AdvancedDetail = ({ data }: Props) => {
  const DATA = {
    Method: data.selector,
    Args: data.args,
  };

  return (
    <Grid container>
      {Object.entries(DATA).map(([name, value], index) => {
        return (
          <Box sx={{ width: "100%", display: "flex" }} key={index}>
            <CustomGridItem colType="name">{name}</CustomGridItem>
            <CustomGridItem colType="value">{value}</CustomGridItem>
          </Box>
        );
      })}
    </Grid>
  );
};
