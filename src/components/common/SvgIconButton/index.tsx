import {
  CircularProgress,
  IconButton,
  IconButtonProps,
  SvgIcon,
  SvgIconTypeMap,
  Tooltip,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactElement, useCallback, useState } from "react";

type SvgIconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
  muiName: string;
};

interface Props extends IconButtonProps {
  initialToolTipText?: string;
  icon: SvgIconType;
  onClick: (event: unknown) => void;
  isLoading?: boolean;
}

const SvgIconButton = ({
  initialToolTipText = "See in explorer",
  icon,
  onClick,
  isLoading,
  ...props
}: Props): ReactElement => {
  const [tooltipText, setTooltipText] = useState(initialToolTipText);

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => {
      setTooltipText(initialToolTipText);
    }, 500);
  }, [initialToolTipText]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Tooltip
      title={tooltipText}
      placement="top"
      onMouseLeave={handleMouseLeave}
    >
      <IconButton
        aria-label={initialToolTipText}
        onClick={onClick}
        size="small"
        {...props}
      >
        <SvgIcon component={icon} inheritViewBox fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default SvgIconButton;
