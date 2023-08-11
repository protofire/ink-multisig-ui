import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

import { SMART_CONTRACT } from "@/config/images";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";

import { DryRunResult } from "../DryRunExecution";

interface Props {
  showTxCard: boolean;
  contractPromise: ContractPromise | undefined;
  message: AbiMessage | undefined;
  params: unknown[] | undefined;
}

export function TxExecution({
  showTxCard,
  contractPromise,
  message,
  params,
}: Props) {
  const theme = useTheme();
  if (!showTxCard || !contractPromise || !message) {
    return (
      <Fade in={!showTxCard} timeout={500}>
        <Box sx={{ minWidth: "25rem" }}>
          <Image
            alt={"Smart Contract inside polkadot parachains"}
            src={SMART_CONTRACT}
            width={300}
            height={200}
            color={theme.palette.primary.contrastText}
            priority
          />
        </Box>
      </Fade>
    );
  }

  return (
    <Slide in={showTxCard} timeout={1000} direction="left">
      <Card sx={{ minWidth: "25rem", padding: "0.5rem" }}>
        <CardHeader title="Tx Execution" />
        <Divider />
        <CardContent>
          <DryRunResult
            contractPromise={contractPromise}
            message={message}
            params={params}
          />
          <Button
            sx={{ marginTop: "2rem" }}
            type="submit"
            variant="contained"
            color="primary"
            // onClick={() => handleSubmit()}
          >
            Call
          </Button>
        </CardContent>
      </Card>
    </Slide>
  );
}
