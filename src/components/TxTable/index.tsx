import { Box } from "@mui/material";
import { useState } from "react";

import { TX_TYPE } from "@/config/images";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import AssetTabs from "./Tabs";
import { txType } from "./TxDetail/types";
import { TxDetailItem } from "./TxDetailItem";

const types = ["Queue", "History"];

export default function TxTable() {
  const [type, setType] = useState(types[0]);
  const handleChange = (newValue: number) => {
    setType(types[newValue]);
  };

  // remove later
  const loading = false;

  const tableData = [
    {
      nonce: 22,
      address: "5CPYTLM8r7fAChtqKWY4SQndKRZXUG9wm6VKnpBLqLjutyNw",
      value: 300,
      token: "ROC",
      date: "7:20 PM",
      status: "CONTRACT",
    },
    {
      nonce: 23,
      address: "5FWbLCgqF3VHhGPJjnTp3RwB8yW3Zf4wcLv1NMqLEEJaaMNS",
      value: 150,
      token: "ROC",
      date: "5:20 PM",
      status: "EXECUTED_SUCCESS",
    },
    {
      nonce: 24,
      address: "5HGoxwXf22nczY4gWJRmo1NACNWTFFQSF3wsZvm2UpJx2Fpx",
      value: 300,
      token: "ROC",
      date: "7:20 PM",
      status: "EXECUTED_FAIL",
    },
  ];

  const txTypes = {
    EXECUTED_SUCCESS: {
      img: TX_TYPE.SEND,
      type: "Send",
    },
    EXECUTED_FAIL: {
      img: TX_TYPE.RECEIVE,
      type: "Receive",
    },
    PENDING: {
      img: TX_TYPE.PENDING,
      type: "Pending",
    },
    CONTRACT: {
      img: TX_TYPE.CONTRACT,
      type: "Contract Interaction",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AssetTabs options={types} onChange={handleChange}>
        {!loading ? (
          <>
            {tableData.map((data, index) => {
              const txType = data.status as txType;
              const txData = txTypes[txType];
              return (
                <TxDetailItem
                  key={index}
                  data={data}
                  txData={txData}
                  txType={txType}
                ></TxDetailItem>
              );
            })}
          </>
        ) : (
          <Box mt={2}>
            <LoadingSkeleton count={10} />
          </Box>
        )}
      </AssetTabs>
    </Box>
  );
}
