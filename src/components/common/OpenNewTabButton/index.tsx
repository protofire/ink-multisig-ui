import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { ReactElement, useCallback, useState } from "react";

import { openInNewTab } from "@/utils/browserMethods";

const OpenNewTabButton = ({
  text,
  initialToolTipText = "See in explorer",
}: {
  text: string;
  initialToolTipText?: string;
}): ReactElement => {
  const [tooltipText, setTooltipText] = useState(initialToolTipText);

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => {
      setTooltipText(initialToolTipText);
    }, 500);
  }, [initialToolTipText]);

  return (
    <Tooltip
      title={tooltipText}
      placement="top"
      onMouseLeave={handleMouseLeave}
    >
      <IconButton
        aria-label={initialToolTipText}
        onClick={() => openInNewTab(text)}
        size="small"
      >
        <SvgIcon component={ArrowOutwardIcon} inheritViewBox fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default OpenNewTabButton;
