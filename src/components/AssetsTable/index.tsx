import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ROUTES } from "@/config/routes";
import useFetchAssets, {
  Asset,
  AssetType,
} from "@/hooks/assets/useFetchAssets";
import { balanceToFixed } from "@/utils/formatString";

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
  const [address, setAddress] = useState("");
  const { listAssetByType, error, loading } = useFetchAssets(address);
  const { addNotification } = useAppNotificationContext();
  const router = useRouter();

  useEffect(() => {
    if (!error) return;
    addNotification({ message: error, type: "error" });
  }, [addNotification, error]);

  const formatData = (data: Asset[]) => {
    return data.map((asset) => {
      return {
        ...asset,
        balance: balanceToFixed(asset.balance, asset.decimals),
      };
    });
  };
  const tableData = formatData(listAssetByType(type));

  const handleChange = (newValue: number) => {
    setType(types[newValue]);
  };

  const handleTransfer = (row: unknown) => {
    const asset = row as Asset;
    router.replace({
      pathname: ROUTES.NewTx,
      query: { token: asset.address },
    });
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
            handleNewToken={(address: string) => setAddress(address)}
          />
        }
      >
        {!loading ? (
          <BasicTable
            columns={columns}
            rows={tableData}
            action={handleTransfer}
          />
        ) : (
          <Box mt={2}>
            <LoadingSkeleton count={10} />
          </Box>
        )}
      </AssetTabs>
    </Box>
  );
}
