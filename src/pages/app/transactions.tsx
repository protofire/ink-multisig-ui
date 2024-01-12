import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import { TAB_TX, TxTable, TxTabType } from "@/components/TxTable";
import { ROUTES } from "@/config/routes";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

const DEFAULT_TAB = TAB_TX.indexOf(TAB_TX[0]);

export default function TxPage() {
  const [tabSelectedIndex, setTabSelectedIndex] = useState(DEFAULT_TAB);
  const { xSignerSelected } = useGetXsignerSelected();

  const router = useRouter();
  const { tab } = router.query;

  const setTab = useCallback(() => {
    let tabIndex = 0;
    if (tab !== undefined && !Array.isArray(tab)) {
      if (TAB_TX.includes(tab as TxTabType)) {
        tabIndex = TAB_TX.indexOf(tab as TxTabType);
      }
    }
    handleChange(null, tabIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const handleChange = (_: React.SyntheticEvent | null, newValue: number) => {
    setTabSelectedIndex(newValue);
    router.replace({
      pathname: ROUTES.Transactions,
      query: { tab: TAB_TX[newValue] },
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
        tabSelectedIndex={tabSelectedIndex}
        xsignerAccount={xSignerSelected}
        handleChange={handleChange}
      />
    </Box>
  );
}
