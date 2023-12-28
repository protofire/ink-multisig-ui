import { Grid } from "@mui/material";
import { Fragment } from "react";

import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";

import { CustomGridItem } from "./styled";

type Props = { data: TransactionProposedItemUi };

export const AdvancedDetail = ({ data }: Props) => {
  const DATA = {
    "Method selector": data.selector,
    "Method name": data.methodName ?? "-",
    "Raw args": data.rawArgs ?? "-",
    Argument: data.args?.length === 0 || data.args === null ? "-" : data.args,
    Value: data.valueAmount ?? data.value,
    "Creation block #": data.creationBlockNumber,
    "Last update block #": data.lastUpdatedBlockNumber,
  };

  return (
    <Grid container>
      {Object.entries(DATA).map(([name, value], index) => {
        if (Array.isArray(value)) {
          return (
            <Fragment key={name + index}>
              <Grid
                item
                sx={{
                  color: "#837376",
                }}
                xs={3}
                sm={3}
                md={3}
              >{`${name}s (decoded):`}</Grid>
              <CustomGridItem colType="value" />
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                color="#837376"
                pl={"1.5rem"}
                sx={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  textTransform: "uppercase",
                }}
                mb={index === value.length - 1 ? "1rem" : ""}
              >
                {name} name
              </Grid>
              <Grid
                item
                xs={9}
                sm={9}
                md={9}
                sx={{
                  fontWeight: "bolder",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                {name} value
              </Grid>
              {value.map((element, index) => {
                return (
                  <Fragment key={element.name + index}>
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      md={3}
                      color="#837376"
                      pl={"1.5rem"}
                      mb={index === value.length - 1 ? "0.5rem" : ""}
                    >{`${element.name}:`}</Grid>
                    <Grid item xs={9} sm={9} md={9}>
                      {element.value}
                    </Grid>
                  </Fragment>
                );
              })}
            </Fragment>
          );
        }
        return (
          <Fragment key={index}>
            <CustomGridItem colType="name">{`${name}:`}</CustomGridItem>
            <CustomGridItem colType="value">{value as string}</CustomGridItem>
          </Fragment>
        );
      })}
    </Grid>
  );
};
