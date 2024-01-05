import styled from "@emotion/styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { StepConnector } from "@mui/material";
import Box from "@mui/material/Box";
import Step, { StepProps } from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ContractPromise } from "@polkadot/api-contract";
import * as React from "react";
import { ChainId } from "useink/dist/chains";

import { Order } from "@/domain/repositores/ITxQueueRepository";
import {
  TX_OWNER_STATUS_TYPE,
  TX_STATUS_TYPE,
} from "@/hooks/transactions/const";

import { AccountAvatar } from "../AddressAccountSelect/AccountAvatar";
import CopyButton from "../common/CopyButton";
import { ExplorerLink } from "../ExplorerLink";
import { ConfirmationWidget } from "./ConfirmationWidget";

type OwnerStatus = "Approved" | "Rejected" | "Pending";

export const StyledStep = styled(Step)<StepProps>(() => ({
  padding: 0,
  "& .MuiStepLabel-root": {
    padding: 0,
  },
}));

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

const ColorlibStepIconRoot = styled("div")(() => ({
  zIndex: 1,
  marginTop: "5px",
  color: "#ADD500",
}));

const CircleStepIcon = (status?: string) => {
  const type = {
    Pending: "CircletepIcon",
    Approved: "CircletepIcon-completedIcon",
    Rejected: "CircletepIcon-rejectedIcon",
  };
  return (
    <CircleStepIconRoot>
      <div className={type[status as OwnerStatus] ?? "CircletepIcon"} />
    </CircleStepIconRoot>
  );
};

function ColorlibStepIcon(props: StepIconProps, ownersLength: number) {
  const lastIndex = (ownersLength + 2).toString();
  const icons: { [index: string]: React.ReactElement } = {
    1: <AddCircleIcon />,
    2: <CheckCircleIcon />,
    3: <VisibilityIcon sx={{ color: "#ffff" }} />,
    [lastIndex]: <VisibilityOffIcon sx={{ color: "#ffff" }} />,
  };

  return (
    <ColorlibStepIconRoot>{icons[String(props.icon)]}</ColorlibStepIconRoot>
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
  status,
}: {
  approvalCount: number;
  owners: Order[] | undefined;
  threshold: number;
  network: ChainId;
  txId: string;
  multisigContractPromise?: ContractPromise;
  expanded: boolean;
  status: string;
}) {
  const [showOwners, setShowOwners] = React.useState(true);
  const canBeExecuted =
    approvalCount === threshold ? TX_OWNER_STATUS_TYPE.APPROVED : undefined;

  const isProposed = status === TX_STATUS_TYPE.PROPOSED;

  return (
    <Box
      sx={{ maxWidth: 400, padding: "20px", borderLeft: "3px solid #120D0E" }}
    >
      <Stepper
        connector={
          <StepConnector
            sx={{
              span: {
                minHeight: "19px",
              },
            }}
          ></StepConnector>
        }
        orientation="vertical"
      >
        <StyledStep>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            sx={{
              color: "#ADD500",
            }}
          >
            <Typography>Created</Typography>
          </StepLabel>
        </StyledStep>
        <StyledStep>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            sx={{
              color: "#ADD500",
              display: "flex",
            }}
          >
            <Typography>
              Confirmations{" "}
              {isProposed ? (
                <span
                  style={{ color: "#636669", marginLeft: "1rem" }}
                >{`(${approvalCount} / ${threshold})`}</span>
              ) : null}
            </Typography>
          </StepLabel>
        </StyledStep>
        {showOwners
          ? owners?.map((element: Order, index: number) => (
              <StyledStep active={true} key={index}>
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
                        sx={{ color: "" }}
                        txHash={element.address}
                      />
                    </Box>
                  </Box>
                </StepLabel>
              </StyledStep>
            ))
          : null}
        <StyledStep>
          <StepLabel
            StepIconComponent={(e) => ColorlibStepIcon(e, owners!.length + 1)}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                color: "#ffe873",
                textDecoration: "underline",
              }}
              onClick={() => setShowOwners(!showOwners)}
            >
              {showOwners ? "Hide all" : "Show all"}
            </Typography>
          </StepLabel>
        </StyledStep>
        <StyledStep active={true}>
          <StepLabel
            sx={{ mt: 1.5 }}
            StepIconComponent={() => CircleStepIcon(canBeExecuted)}
          >
            <Typography>
              {isProposed ? "Can be executed" : "Executed"}
            </Typography>
          </StepLabel>
          <StepContent sx={{ mt: "0.4rem", padding: "0px" }}>
            <Box sx={{ ml: 2 }}>
              {isProposed ? (
                <>
                  <Typography sx={{ fontSize: "0.8rem", mb: 3, mr: 3 }}>
                    This transaction will be executed once the threshold is
                    reached
                  </Typography>
                  {multisigContractPromise ? (
                    <ConfirmationWidget
                      multisigContractPromise={multisigContractPromise}
                      txId={txId}
                      expanded={expanded}
                    />
                  ) : null}
                </>
              ) : (
                <Typography sx={{ fontSize: "0.8rem", mb: 2 }}>
                  This transaction has been executed
                </Typography>
              )}
            </Box>
          </StepContent>
        </StyledStep>
      </Stepper>
    </Box>
  );
}
