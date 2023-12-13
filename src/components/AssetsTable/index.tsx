import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import useFetchAssets, { AssetType } from "@/hooks/assets/useFetchAssets";

import { useAppNotificationContext } from "../AppToastNotification/AppNotificationsContext";
import CopyButton from "../common/CopyButton";
import { LoadingSkeleton } from "../common/LoadingSkeleton";
import BasicTable, { Column as BaseColumn } from "../common/Table";
import AddTokenModal from "./AddTokenModal";
import AssetTabs from "./Tabs";

interface Column extends BaseColumn {
  render?: (value: string) => React.ReactNode;
}

const columns: Column[] = [
  { id: "name", label: "ASSET" },
  {
    id: "address",
    label: "ADDRESS",
    render: (value: string) => (
      <Box display="flex" alignItems="center">
        <Box>{value}</Box>
        <CopyButton text={value} />
      </Box>
    ),
  },
  { id: "balance", label: "BALANCE", align: "left" },
];

const types: AssetType[] = ["token", "nft"];

const AssetsTable: React.FC = () => {
  const [type, setType] = useState(types[0]);
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
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
      <AssetTabs
        options={["Tokens", "NFTs"]}
        onChange={handleChange}
        rightComponent={
          <AddTokenModal
            open={open}
            handleOpen={setOpen}
            handleNewToken={(newAddress: string) => setAddress(newAddress)}
          />
        }
      >
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
};

export default AssetsTable;
