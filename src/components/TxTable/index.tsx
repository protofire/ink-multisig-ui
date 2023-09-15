import { Box } from "@mui/material";
import { useState } from "react";

import { LoadingSkeleton } from "../common/LoadingSkeleton";
import { Column } from "../common/Table";
import AssetTabs from "./Tabs";

const columns = [
  { id: "name", label: "ASSET" },
  { id: "balance", label: "BALANCE", align: "left" },
] as Column[];

// const types: TxType[] = ["Queue", "History"];
const types = ["Queue", "History"];

export default function TxTable() {
  const [type, setType] = useState(types[0]);
  // const address = "WTqq9UiVRmRBcEwsv3FkDrEhQHXkXS1oA6tcP94BUdUq6JF"; // Set address here. This will be replaced by Add Asset feature.
  // const { listAssetByType, error, loading } = useFetchAssets(address);
  // const { addNotification } = useAppNotificationContext();

  // useEffect(() => {
  //   if (!error) return;
  //   addNotification({ message: error, type: "error" });
  // }, [addNotification, error]);

  // const tableData = listAssetByType(type);

  const handleChange = (newValue: number) => {
    setType(types[newValue]);
  };

  // remove later
  const loading = false;
  const tableData = [
    {
      nonce: 22,
      type: "Send",
      address: "5CPYTLM8r7fAChtqKWY4SQndKRZXUG9wm6VKnpBLqLjutyNw",
      value: 300,
      token: "ROC",
      date: "7:20 PM",
      status: "pending",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <AssetTabs options={types} onChange={handleChange}>
        {!loading ? (
          <Box></Box>
        ) : (
          <Box mt={2}>
            <LoadingSkeleton count={10} />
          </Box>
        )}
      </AssetTabs>
    </Box>
  );
}
