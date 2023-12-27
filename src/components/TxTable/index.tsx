import { Box } from "@mui/material";
import { useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { TabTxTypes, useListTxQueue } from "@/hooks/txQueue/useListTxQueue";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import TxTabs from "./Tabs";
import { TxDetailItem } from "./TxDetailItem";

const types = ["queue", "history"];

interface Props {
  xsignerAccount: SignatoriesAccount;
}

export default function TxTable({ xsignerAccount }: Props) {
  const [type, setType] = useState(types[0]);
  const { network } = usePolkadotContext();
  const { listTxByType } = useListTxQueue(xsignerAccount, network);
  const handleChange = (newValue: number) => {
    setType(types[newValue]);
  };

  const tableData = listTxByType(type as TabTxTypes);
  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs options={["Queue", "History"]} onChange={handleChange}>
        {tableData !== undefined ? (
          <>
            {tableData.map((data, index) => {
              return (
                <Box key={index}>
                  <TxDetailItem
                    data={data!}
                    network={network}
                    index={index}
                  ></TxDetailItem>
                </Box>
              );
            })}
          </>
        ) : (
          <Box mt={2}>
            <LoadingSkeleton count={10} />
          </Box>
        )}
      </TxTabs>
    </Box>
  );
}
