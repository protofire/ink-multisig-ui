import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { IconButton, Link, Tooltip } from "@mui/material";
import React, { useMemo } from "react";

import { getChain } from "@/config/chain";
import { ChainId } from "@/services/useink/types";

type SubscanPaths = "block" | "extrinsic";

interface ExplorerLinkProps {
  blockchain: ChainId | undefined;
  txHash?: string;
  path?: SubscanPaths;
}

export function ExplorerLink({
  blockchain,
  txHash,
  path = "block",
}: ExplorerLinkProps): JSX.Element | null {
  const explorerUrl = useMemo(
    () => blockchain && getChain(blockchain).subscanUrl,
    [blockchain]
  );
  const linkDisabled = txHash ? false : true;

  if (!explorerUrl) return null;

  const iconWithStyles = linkDisabled ? (
    <Tooltip title="Transaction hash is not available.">
      <OpenInNewRoundedIcon fontSize="small" />
    </Tooltip>
  ) : (
    <OpenInNewRoundedIcon fontSize="small" />
  );

  return (
    <Link href={`${explorerUrl}${path}/${txHash}`} target="_blank">
      <IconButton
        component="a"
        disabled={linkDisabled}
        size="small"
        color="primary"
      >
        {iconWithStyles}
      </IconButton>
    </Link>
  );
}
