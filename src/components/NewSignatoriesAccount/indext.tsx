import { Box, Button } from "@mui/material";

export function NewSignatoriesAccount() {
  //   const { save } = useAddSignatoriesAccount();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          mt: "5rem",
        }}
      >
        <p>Vertical Stepper</p>
        <p>Form To create Wallet</p>
      </Box>

      <Button>Create New account</Button>
    </>
  );
}
