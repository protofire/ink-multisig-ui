import { Card, Grid } from "@mui/material";

export default function AppDashboard() {
  return (
    <Grid container>
      <Grid item xs={12} component="section">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </Grid>
      <Grid item>Widgets</Grid>
    </Grid>
  );
}
