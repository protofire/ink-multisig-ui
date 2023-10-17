import { Toll } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import { SummaryCard } from "@/components/SummaryCard";
import { Transaction } from "@/components/Transaction";

const CaptionComponent = ({
  icon,
  textButton,
  handleClick,
}: {
  icon: React.ReactNode;
  textButton: string;
  handleClick: () => void;
}) => {
  const handleAction = () => {
    handleClick();
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={1}
      justifyContent="space-evenly"
      height={200}
    >
      {icon}
      <Button
        onClick={handleAction}
        sx={{ width: 180 }}
        color="primary"
        variant="contained"
      >
        {textButton}
      </Button>
    </Box>
  );
};

export default function NewTransaction() {
  const theme = useTheme();
  const [actionSelected, setActionSelected] = useState<string>("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
        marginBottom: "2rem",
        width: "80%",
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2} width="100%">
          <Typography variant="h3" color="primary">
            New transaction
          </Typography>
          {actionSelected && (
            <Typography color={theme.palette.grey.A200} variant="h4">
              |
            </Typography>
          )}
          <Typography sx={{ fontWeight: 300 }} variant="h4">
            {actionSelected}
          </Typography>
        </Box>
        {actionSelected && (
          <CancelOutlinedIcon
            onClick={() => setActionSelected("")}
            color="primary"
          />
        )}
      </Box>

      {!actionSelected && (
        <>
          <Typography variant="h6">
            What transaction would you like to create?
          </Typography>
          <Box display="flex" mt={2}>
            <SummaryCard
              styles={{ width: "200px", height: "200px" }}
              captionTitle=""
              captionComponent={
                <CaptionComponent
                  icon={<Toll color="primary" sx={{ fontSize: "3rem" }} />}
                  textButton="Send tokens"
                  handleClick={() => setActionSelected("Send Tokens")}
                />
              }
            />
          </Box>
        </>
      )}
      {actionSelected && <Transaction />}
    </Box>
  );
}
