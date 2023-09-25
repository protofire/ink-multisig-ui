import ShareIcon from "@mui/icons-material/Share";
import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";

import { openInNewTab } from "@/utils/browserMethods";

import { AccountAvatar } from "../../AddressAccountSelect/AccountAvatar";
import CopyButton from "../../common/CopyButton";
import OpenNewTabButton from "../../common/OpenNewTabButton";
import { AdvancedDetail } from "./AdvancedDetail";
import { ContractDetail } from "./ContractDetail";
import { ReceivedDetail } from "./ReceivedDetail";
import { SendDetail } from "./SendDetail";
import { txType } from "./types";

// TODO:
// Remove this mock variable, replace with true value
const mockUrl = "https://polkadot.subscan.io/";
const name = "ProtoFireName";
const address = "5CPYTLM8r7fAChtqKWY4SQndKRZXUG9wm6VKnpBLqLjutyNw";
const value = 20;
const token = "ROC";
const NO_DETAILS_TYPE = "CONTRACT";

const txComponentType = {
  EXECUTED_SUCCESS: {
    component: (
      <SendDetail address={address} name={name} mockUrl={mockUrl}></SendDetail>
    ),
  },
  EXECUTED_FAIL: {
    component: <ReceivedDetail address={address}></ReceivedDetail>,
  },
  PENDING: {
    component: <></>,
  },
  CONTRACT: {
    component: <ContractDetail data={undefined}></ContractDetail>,
  },
};

export const TxDetails = ({ type }: { type: txType }) => {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);
  return (
    <Box
      sx={{
        backgroundColor: "#201A1B",
        width: "72%",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          borderBottom: "3px solid #120D0E",
        }}
      >
        <Typography color="white">
          Send <span style={{ fontWeight: "bold" }}>{`${value} ${token}`}</span>{" "}
          to:
        </Typography>

        <Box
          sx={{
            display: "flex",
            position: "relative",
          }}
        >
          <AccountAvatar
            address={address}
            name={name}
            truncateLenght={16}
          ></AccountAvatar>
          <Box sx={{ marginTop: "20px", marginLeft: "15px" }}>
            <CopyButton text={address} />
            <OpenNewTabButton text={mockUrl} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: "20px",
              borderRadius: "50%",
              color: "#FFE873",
              backgroundColor: "#352F30",
              width: "36px",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => openInNewTab(address)}
          >
            <ShareIcon></ShareIcon>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        {txComponentType[type].component}
        {type !== NO_DETAILS_TYPE ? (
          <Link
            sx={{ fontWeight: "bold", marginTop: "22px" }}
            href="#"
            onClick={() => setShowAdvancedDetails(!showAdvancedDetails)}
          >
            {"Advanced Details"}
          </Link>
        ) : (
          <></>
        )}
        {showAdvancedDetails ? (
          <AdvancedDetail data={undefined}></AdvancedDetail>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
