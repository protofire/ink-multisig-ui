import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import useFetchAssets, { AssetType } from "@/hooks/assets/useFetchAssets";

import { useAppNotificationContext } from "../AppToastNotification/AppNotificationsContext";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import BasicTable, { Column } from "../common/Table";
import AddTokenModal from "./AddTokenModal";
import AssetTabs from "./Tabs";

const columns = [
  { id: "name", label: "ASSET" },
  { id: "balance", label: "BALANCE", align: "left" },
] as Column[];

const types: AssetType[] = ["token", "nft"];

export default function AssetsTable() {
  const [type, setType] = useState(types[0]);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(
    "WTqq9UiVRmRBcEwsv3FkDrEhQHXkXS1oA6tcP94BUdUq6JF"
  );
  const { listAssetByType, error, loading } = useFetchAssets(address);
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
      <AddTokenModal
        open={open}
        handleOpen={setOpen}
        handleNewToken={(address: string) => setAddress(address)}
      />
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
