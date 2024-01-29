import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useState } from "react";

import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";

import { CustomGridItem } from "../styled";
import { ArgsTable } from "./ArgsTable";
import {
  DetailsAccordion,
  DetailsAccordionContent,
  DetailsAccordionSummary,
} from "./styled";

type Props = { data: TransactionProposedItemUi };

export function AdvancedDetail({ data }: Props) {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(true);

  return (
    <DetailsAccordion
      key={data.id}
      expanded={showAdvancedDetails}
      onChange={() => setShowAdvancedDetails(!showAdvancedDetails)}
    >
      <DetailsAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`advanced-details-content-${data.id}`}
        id={`advanced-details-header-${data.id}`}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            color: "#ffe873", // Color del enlace
            textDecoration: "underline", // Subrayado para parecer un enlace
          }}
        >
          Details
        </Typography>
      </DetailsAccordionSummary>
      <DetailsAccordionContent>
        <AdvancedDetailContent data={data} />
      </DetailsAccordionContent>
    </DetailsAccordion>
  );
}

export function AdvancedDetailContent({ data }: Props) {
  const DATA = {
    "Method selector": data.selector,
    "Raw args": data.rawArgs ?? "-",
    "Method name": data.methodName ?? "-",
    Arguments: data.args?.length === 0 || data.args === null ? "-" : data.args,
    Value: data.valueAmount ?? data.value,
    "Creation block #": data.creationBlockNumber,
    "Last update block #": data.lastUpdatedBlockNumber,
  };

  return (
    <Grid container>
      {Object.entries(DATA).map(([name, value]) => {
        const argKey = `${name}-${data.txId}`;

        if (Array.isArray(value)) {
          return (
            <ArgsTable
              key={argKey}
              argKey={argKey}
              argName={name}
              argValue={value}
            />
          );
        }
        return (
          <Fragment key={argKey}>
            <CustomGridItem colType="name">{`${name}:`}</CustomGridItem>
            <CustomGridItem colType="value">
              <Box
                sx={{
                  padding: "0.6em 0",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                }}
              >
                {value as string}
              </Box>
            </CustomGridItem>
          </Fragment>
        );
      })}
    </Grid>
  );
}
