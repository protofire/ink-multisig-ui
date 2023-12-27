import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { IconButton, Link, SxProps, Theme, Tooltip } from "@mui/material";
import React, { useMemo } from "react";

import { getChain } from "@/config/chain";
import { ChainId } from "@/services/useink/types";

type SubscanPaths = "block" | "extrinsic" | "account";

interface ExplorerLinkProps {
  blockchain: ChainId | undefined;
  txHash?: string;
  path?: SubscanPaths;
  sx?: SxProps<Theme> | undefined;
  toolTipText?: string;
}

export function ExplorerLink({
  blockchain,
  txHash,
  path = "block",
  sx,
  toolTipText = "See in explorer",
}: ExplorerLinkProps): JSX.Element | null {
  const explorerUrl = useMemo(
    () => blockchain && getChain(blockchain).subscanUrl,
    [blockchain]
  );
  const linkDisabled = txHash ? false : true;

  if (!explorerUrl) return null;

  const iconWithStyles = linkDisabled ? (
    <Tooltip title="Transaction hash is not available.">
      <ArrowOutwardIcon fontSize="small" />
    </Tooltip>
  ) : (
    <Tooltip title={toolTipText} placement="top">
      <ArrowOutwardIcon fontSize="small" />
    </Tooltip>
  );

  return (
    <Link href={`${explorerUrl}${path}/${txHash}`} target="_blank">
      <IconButton
        disabled={linkDisabled}
        size="small"
        sx={sx ? sx : (theme) => ({ color: theme.palette.primary.main })}
      >
        {iconWithStyles}
      </IconButton>
    </Link>
  );
}
