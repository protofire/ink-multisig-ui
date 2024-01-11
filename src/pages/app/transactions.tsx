import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { TxTable } from "@/components/TxTable";
import { ROUTES } from "@/config/routes";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

const types = ["queue", "history"];

export default function TxPage() {
  const [value, setValue] = useState(types.indexOf(types[0]));
  const { xSignerSelected } = useGetXsignerSelected();

  const router = useRouter();
  const { tab } = router.query;

  const setTab = useCallback(() => {
    let tabIndex = 0;
    if (tab !== undefined && !Array.isArray(tab)) {
      if (types.includes(tab)) {
        tabIndex = types.indexOf(tab);
      }
    }
    handleChange(null, tabIndex);
  }, [tab]);

  const handleChange = (_: React.SyntheticEvent | null, newValue: number) => {
    setValue(newValue);
    router.replace({
      pathname: ROUTES.Transactions,
      query: { tab: types[newValue] },
    });
  };

  useEffect(() => {
    setTab();
  }, [setTab]);

  if (!xSignerSelected) {
    return <FallbackSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography mb={2} variant="h3" color="primary">
        Transactions
      </Typography>
      <TxTable
        types={types}
        value={value}
        xsignerAccount={xSignerSelected}
        handleChange={handleChange}
      />
    </Box>
  );
}
