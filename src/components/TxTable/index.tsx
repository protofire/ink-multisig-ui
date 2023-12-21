import { Box } from "@mui/material";
import { useState } from "react";

import { usePolkadotContext } from "@/context/usePolkadotContext";
import { TabTxTypes, useListTxQueue } from "@/hooks/txQueue/useListTxQueue";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import TxTabs from "./Tabs";
import { TxDetailItem } from "./TxDetailItem";

const types = ["queue", "history"];

export default function TxTable() {
  const [type, setType] = useState(types[0]);
  const { xSignerSelected } = useGetXsignerSelected();
  const { network } = usePolkadotContext();
  const { listTxByType } = useListTxQueue(xSignerSelected?.address, network);
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
