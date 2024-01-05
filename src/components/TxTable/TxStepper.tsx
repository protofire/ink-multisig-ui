import styled from "@emotion/styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ContractPromise } from "@polkadot/api-contract";
import * as React from "react";
import { ChainId } from "useink/dist/chains";

import { Order } from "@/domain/repositores/ITxQueueRepository";
import { TX_OWNER_STATUS_TYPE } from "@/hooks/txQueue/useListTxQueue";

import { AccountAvatar } from "../AddressAccountSelect/AccountAvatar";
import CopyButton from "../common/CopyButton";
import { ExplorerLink } from "../ExplorerLink";
import { ConfirmationWidget } from "./ConfirmationWidget";

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
  "& .CircletepIcon-rejectedIcon": {
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "red",
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(() => ({
  zIndex: 1,
  marginTop: "5px",
  color: "#ADD500",
}));

const CircleStepIcon = (status?: string) => {
  let className = "CircletepIcon";

  if (status === TX_OWNER_STATUS_TYPE.APPROVED) {
    className = "CircletepIcon-completedIcon";
  } else if (status === TX_OWNER_STATUS_TYPE.REJECTED) {
    className = "CircletepIcon-rejectedIcon";
  }

  return (
    <CircleStepIconRoot>
      <div className={className} />
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
  threshold,
  network,
  txId,
  multisigContractPromise,
  expanded,
}: {
  approvalCount: number;
  owners: Order[] | undefined;
  threshold: number;
  network: ChainId;
  txId: string;
  multisigContractPromise: ContractPromise;
  expanded: boolean;
}) {
  const [showOwners, setShowOwners] = React.useState(true);
  const canBeExecuted =
    approvalCount === threshold ? TX_OWNER_STATUS_TYPE.APPROVED : undefined;

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
              >{`(${approvalCount} / ${threshold})`}</span>
            </Typography>{" "}
          </StepLabel>
        </Step>
        {showOwners ? (
          owners?.map((element: Order, index: number) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={() => CircleStepIcon(element.status)}
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
            StepIconComponent={() => CircleStepIcon()}
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
            StepIconComponent={() => CircleStepIcon(canBeExecuted)}
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
            <ConfirmationWidget
              multisigContractPromise={multisigContractPromise}
              txId={txId}
              expanded={expanded}
            />
          </Box>
        </Step>
      </Stepper>
    </Box>
  );
}
