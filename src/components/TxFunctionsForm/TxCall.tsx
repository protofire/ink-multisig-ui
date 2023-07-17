import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  Slide,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import { SMART_CONTRACT } from "@/config/images";
import { useGetDryRun } from "@/hooks/useGetDryRun";
import { AbiMessage, ContractPromise } from "@/services/substrate/types";

import CodeBlock from "../CodeBlock";

interface Props {
  showTxCard: boolean;
  contractPromise: ContractPromise;
  message: AbiMessage;
}
export function TxCall({ showTxCard, contractPromise, message }: Props) {
  const dryRun = useGetDryRun(contractPromise, message.method);
  const [outcome, setOutcome] = useState<string>("No results yet...");

  const handleSubmit = async () => {
    dryRun.resetState();
    const result = await dryRun.send();
    if (result?.ok) {
      setOutcome(
        `Contract call will be successful executed with ${result.value.partialFee.toString()} fee`
      );
    } else {
      setOutcome("Contract will be reverted");
    }
  };

  console.log("__dryRun", dryRun);
  if (!showTxCard) {
    return (
      <Fade in={!showTxCard} timeout={500}>
        <Image
          alt={"Smart Contract inside polkadot parachains"}
          src={SMART_CONTRACT}
          width={300}
          height={200}
        />
      </Fade>
    );
  }

  return (
    <Slide in={showTxCard} timeout={1000} direction="left">
      <Card sx={{ minWidth: "25rem", padding: "0.5rem" }}>
        <CardHeader title="Tx Execution" />
        <Divider />
        <CardContent>
          <CodeBlock code={outcome} label="Dry-run outcome" />
          <Button
            sx={{ marginTop: "2rem" }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Call
          </Button>
        </CardContent>
      </Card>
    </Slide>
  );
}
