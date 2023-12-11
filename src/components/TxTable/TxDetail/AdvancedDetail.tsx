import { Grid } from "@mui/material";

import { ExtendedDataType } from "../TxDetailItem";
import { CustomGridItem } from "./styled";

type Props = { data: ExtendedDataType };

export const AdvancedDetail = ({ data }: Props) => {
  const DATA = {
    Method: data.selector,
    Args: data.args,
  };

  return (
    <Grid container>
      {Object.entries(DATA).map(([key, value]) => {
        return (
          <>
            <CustomGridItem colType="name">{key}</CustomGridItem>
            <CustomGridItem colType="value">{value}</CustomGridItem>
          </>
        );
      })}
    </Grid>
  );
};
