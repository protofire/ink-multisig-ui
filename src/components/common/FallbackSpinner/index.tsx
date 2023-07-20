import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

export const FallbackSpinner = (props: { text?: string }) => {
  const { text } = props;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Image src="/Simplr.ico" alt="Multisig Logo" width={30} height={30} />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
      {text ? (
        <Box
          sx={{
            paddingTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {text}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
