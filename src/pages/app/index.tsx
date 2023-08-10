import { CardHeader, Grid, Typography } from "@mui/material";

import { WidgetCard } from "@/components/common/muiExtended/WidgetCard";

const SummaryCard = ({ captionTitle }: { captionTitle: string }) => {
  return (
    <WidgetCard border={false}>
      {captionTitle && (
        <CardHeader>
          <Typography variant="h3">{captionTitle}</Typography>
        </CardHeader>
      )}
    </WidgetCard>
  );
};

export default function AppDashboard() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Summary</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <SummaryCard captionTitle="Total Page Views" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SummaryCard captionTitle="Total Users" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SummaryCard captionTitle="Total Order" />
      </Grid>
    </Grid>
  );
}
