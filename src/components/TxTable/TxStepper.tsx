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

import { TransactionType } from "@/domain/repositores/ITxQueueRepository";

import { AccountAvatar } from "../AddressAccountSelect/AccountAvatar";
import CopyButton from "../common/CopyButton";
import OpenNewTabButton from "../common/OpenNewTabButton";

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

export default function TxStepper({ data }: { data: TransactionType }) {
  const [showOwners, setShowOwners] = React.useState(true);
  const approvalCount = data.approvalCount;
  const approvalsLength = data.approvals.length;

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
              >{`(${approvalsLength} / ${approvalCount})`}</span>
            </Typography>{" "}
          </StepLabel>
        </Step>
        {showOwners ? (
          data.approvals.map((approvals, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={() => CircleStepIcon(false)}>
                <Box sx={{ display: "flex" }}>
                  <AccountAvatar
                    address={approvals.approver}
                    // name={owner.name}
                    truncateLenght={4}
                  ></AccountAvatar>
                  <Box sx={{ marginTop: "20px", marginLeft: "15px" }}>
                    <CopyButton text={approvals.approver} />
                    <OpenNewTabButton text={"mockURL"} />
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
              Hide all
            </Link>
          </StepLabel>
        </Step>
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
                This transaction will be executed once the threshold is reached
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
      </Stepper>
    </Box>
  );
}
