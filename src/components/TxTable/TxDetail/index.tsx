import ShareIcon from "@mui/icons-material/Share";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";
import { openInNewTab } from "@/utils/browserMethods";

import { AccountAvatar } from "../../AddressAccountSelect/AccountAvatar";
import CopyButton from "../../common/CopyButton";
import OpenNewTabButton from "../../common/OpenNewTabButton";
import { ExtendedDataType } from "../TxDetailItem";
import { ReceivedDetail } from "./ReceivedDetail";
import { SendDetail } from "./SendDetail";

const txComponentType = (
  data: ExtendedDataType,
  address: string,
  mockUrl: string
) => {
  const name = "ProtofireName";
  return {
    Send: {
      component: (
        <SendDetail
          address={address}
          name={name}
          mockUrl={mockUrl}
        ></SendDetail>
      ),
    },
    Receive: {
      component: <ReceivedDetail address={address}></ReceivedDetail>,
    },
  };
};

interface Props {
  data: ExtendedDataType;
}

export const TxDetails = ({ data }: Props) => {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);
  const { xSignerSelected } = useGetXsignerSelected();
  const mockUrl = "https://polkadot.subscan.io/";

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
          {data.type}{" "}
          <span style={{ fontWeight: "bold" }}>{`${data.value}`}</span>{" "}
          {data.txMsg}
        </Typography>

        <Box
          sx={{
            display: "flex",
            position: "relative",
          }}
        >
          <AccountAvatar
            address={xSignerSelected?.address as string}
            name={xSignerSelected?.name}
            truncateLenght={16}
          ></AccountAvatar>
          <Box sx={{ marginTop: "20px", marginLeft: "15px" }}>
            <CopyButton text={xSignerSelected?.address as string} />
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
            onClick={() => openInNewTab(xSignerSelected?.address as string)}
          >
            <ShareIcon></ShareIcon>
          </Box>
        </Box>
      </Box>
      {/* <Box
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
      </Box> */}
    </Box>
  );
};
