import { Grid, Typography } from "@mui/material";
import Link from "next/link";

import AccountConfirmationModal from "@/components/AccountConfirmationModal";
import { AddressBookWidget } from "@/components/AddressBookWidget";
import { FallbackSpinner } from "@/components/common/FallbackSpinner";
import NetworkConfirmationModal from "@/components/NetworkConfirmationModal";
import { SummaryCard } from "@/components/SummaryCard";
import { XsignerBalanceText } from "@/components/SummaryCard/XsignerBalanceText";
import { TxQueueWidget } from "@/components/TxQueueWidget";
import { ROUTES } from "@/config/routes";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

export default function AppDashboard() {
  const { xSignerSelected } = useGetXsignerSelected();

  const { balance, isLoading: isLoadingBalance } = useGetBalance(
    xSignerSelected?.address
  );

  if (!xSignerSelected) {
    return <FallbackSpinner />;
  }

  return (
    <>
      <NetworkConfirmationModal />
      <AccountConfirmationModal />
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            captionTitle="Balance"
            widthSkeleton="60%"
            captionComponent={
              balance && <XsignerBalanceText balance={balance} />
            }
            isLoading={isLoadingBalance}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard captionTitle="Tracked Tokens" caption="-" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            captionTitle="Confirmations required"
            caption={xSignerSelected?.threshold?.toString()}
            isLoading={xSignerSelected ? false : true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link href={ROUTES.Settings}>
            <SummaryCard
              captionTitle="Owners"
              caption={xSignerSelected?.owners?.length?.toString()}
              isLoading={xSignerSelected ? false : true}
            />
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "1rem",
        }}
      >
        <Grid item xs={6}>
          <Typography variant="h3" color="primary">
            Address book
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h3" color="primary">
            Transaction queue
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <AddressBookWidget />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <TxQueueWidget xsignerAccount={xSignerSelected} />
        </Grid>
      </Grid>
    </>
  );
}
