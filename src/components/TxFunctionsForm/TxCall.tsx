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

import { SMART_CONTRACT } from "@/config/images";

import CodeBlock from "../CodeBlock";

interface Props {
  showTxCard: boolean;
}
export function TxCall({ showTxCard }: Props) {
  if (!showTxCard) {
    return (
      <Fade in={!showTxCard} timeout={500}>
        <Image
          alt={"Smart Contract inside polkadot parachains"}
          src={SMART_CONTRACT}
          width={300}
          height={200}
          // sizes="100vw"
          // style={{ width: "100%", height: "auto" }}
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
          <CodeBlock code={"Dry Run"} />
          <Button
            sx={{ marginTop: "2rem" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Call
          </Button>
        </CardContent>
      </Card>
    </Slide>
  );
}
