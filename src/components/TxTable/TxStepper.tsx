import styled from "@emotion/styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ChainId } from "useink/dist/chains";

import { Order } from "@/domain/repositores/ITxQueueRepository";
import { TX_OWNER_STATUS_TYPE } from "@/hooks/txQueue/useListTxQueue";

import { AccountAvatar } from "../AddressAccountSelect/AccountAvatar";
import CopyButton from "../common/CopyButton";
import { ExplorerLink } from "../ExplorerLink";

const CircleStepIconRoot = styled("div")(() => ({
  marginLeft: "7px",
  "& .CircletepIcon": {
    width: 11,
    height: 11,
    borderRadius: "50%",
    border: "2px solid #ffff",
  },
  "& .CircletepIcon-completedIcon": {
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "#ADD500",
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(() => ({
  zIndex: 1,
  marginTop: "5px",
  color: "#ADD500",
}));

const CircleStepIcon = (isSigned: boolean) => {
  return (
    <CircleStepIconRoot>
      {isSigned ? (
        <div className="CircletepIcon-completedIcon" />
      ) : (
        <div className="CircletepIcon" />
      )}
    </CircleStepIconRoot>
  );
};

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AddCircleIcon />,
    2: <CheckCircleIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function TxStepper({
  approvalCount,
  owners,
  network,
  successTx = false,
}: {
  approvalCount: number;
  owners: Order[] | undefined;
  network: ChainId;
  successTx: boolean;
}) {
  const [showOwners, setShowOwners] = React.useState(true);
  const approvalsLength = owners?.length;

  return (
    <Box
      sx={{ maxWidth: 400, padding: "20px", borderLeft: "3px solid #120D0E" }}
    >
      <Stepper orientation="vertical">
        <Step>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            sx={{
              color: "#ADD500",
              fontSize: "1.5rem",
            }}
          >
            <Typography>Created</Typography>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            sx={{
              color: "#ADD500",
              display: "flex",
            }}
          >
            <Typography>
              Confirmations{" "}
              <span
                style={{ color: "#636669", marginLeft: "1rem" }}
              >{`(${approvalCount} / ${approvalsLength})`}</span>
            </Typography>{" "}
          </StepLabel>
        </Step>
        {showOwners ? (
          owners?.map((element: Order, index: number) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={() =>
                  CircleStepIcon(
                    element.status === TX_OWNER_STATUS_TYPE.APPROVED
                  )
                }
              >
                <Box sx={{ display: "flex" }}>
                  <AccountAvatar
                    address={element.address}
                    name={element.name}
                    truncateLenght={4}
                  ></AccountAvatar>
                  <Box
                    sx={{
                      marginTop: "20px",
                      marginLeft: "15px",
                      display: "flex",
                    }}
                  >
                    <CopyButton text={element.address} />
                    <ExplorerLink
                      blockchain={network}
                      path="account"
                      txHash={element.address}
                      sx={{ color: "" }}
                    />
                  </Box>
                </Box>
              </StepLabel>
            </Step>
          ))
        ) : (
          <></>
        )}
        <Step>
          <StepLabel
            StepIconComponent={() => CircleStepIcon(true)}
            sx={{
              color: "#ADD500",
            }}
          >
            <Link
              sx={{ fontSize: "1.1rem" }}
              onClick={() => setShowOwners(!showOwners)}
            >
              {showOwners ? "Hide all" : "Show all"}
            </Link>
          </StepLabel>
        </Step>
        {!successTx ? (
          <Step>
            <StepLabel
              StepIconComponent={() => CircleStepIcon(false)}
              sx={{
                color: "#FFFF",
              }}
            >
              <Typography>Can be executed</Typography>
              <StepContent sx={{ margin: "0px", padding: "0px" }}>
                <span style={{ fontSize: "0.8rem" }}>
                  This transaction will be executed once the threshold is
                  reached
                </span>{" "}
              </StepContent>
            </StepLabel>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Button variant="outlined">Reject</Button>
              <Button variant="contained">Confirm</Button>
            </Box>
          </Step>
        ) : null}
      </Stepper>
    </Box>
  );
}
