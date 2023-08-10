import { CardHeader, Grid, Stack, Typography } from "@mui/material";

import { WidgetCard } from "@/components/common/muiExtended/WidgetCard";

const SummaryCard = ({
  captionTitle,
  caption,
}: {
  captionTitle: string;
  caption?: string;
}) => {
  return (
    <WidgetCard
      border={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Stack>
        <Typography sx={{ alignSelf: "center" }} color="white">
          {caption}
        </Typography>
        {captionTitle && (
          <CardHeader
            sx={{ alignItems: "flex-end" }}
            title={
              <Typography variant="h4" color="white">
                {captionTitle}
              </Typography>
            }
          />
        )}
      </Stack>
    </WidgetCard>
  );
};

export default function AppDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Summary</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard captionTitle="Balance" caption="0 Roc" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard captionTitle="Tracked Tokens" caption="0" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard captionTitle="Tracked NFTs" caption="3" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard captionTitle="Transactions queued" caption="0" />
      </Grid>
    </Grid>
  );
}
