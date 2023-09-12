import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import useFetchAssets, { AssetType } from "@/hooks/assets/useFetchAssets";

import { useAppNotificationContext } from "../AppToastNotification/AppNotificationsContext";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import BasicTable, { Column } from "../common/Table";
import AssetTabs from "./Tabs";

const columns = [
  { id: "name", label: "ASSET" },
  { id: "balance", label: "BALANCE", align: "left" },
  {
    id: "value",
    label: "VALUE",
    align: "left",
    format: (value: number) => `${value}`,
  },
] as Column[];

const types: AssetType[] = ["token", "nft"];
const ADDRESS = "WTqq9UiVRmRBcEwsv3FkDrEhQHXkXS1oA6tcP94BUdUq6JF"; // Set address here. This will be replaced by Add Asset feature.

export default function AssetsTable() {
  const [type, setType] = useState(types[0]);
  const { listAssetByType, error, loading } = useFetchAssets(ADDRESS);
  const { addNotification } = useAppNotificationContext();

  useEffect(() => {
    if (!error) return;
    addNotification({ message: error, type: "error" });
  }, [addNotification, error]);

  const tableData = listAssetByType(type);

  const handleChange = (newValue: number) => {
    setType(types[newValue]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AssetTabs options={["Tokens", "NFTs"]} onChange={handleChange}>
        {!loading ? (
          <BasicTable columns={columns} rows={tableData} />
        ) : (
          <Box mt={2}>
            <LoadingSkeleton count={10} />
          </Box>
        )}
      </AssetTabs>
    </Box>
  );
}
