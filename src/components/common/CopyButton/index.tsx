import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import {
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";

const CopyButton = ({
  text,
  className,
  children,
  initialToolTipText = "Copy to clipboard",
  onCopy,
}: {
  text: string;
  className?: string;
  children?: ReactNode;
  initialToolTipText?: string;
  ariaLabel?: string;
  onCopy?: () => void;
}): ReactElement => {
  const [tooltipText, setTooltipText] = useState(initialToolTipText);
  const [isCopyEnabled, setIsCopyEnabled] = useState(true);

  const handleCopy = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        navigator.clipboard
          .writeText(text)
          .then(() => setTooltipText("Copied"));
        onCopy?.();
      } catch (err) {
        setIsCopyEnabled(false);
        setTooltipText("Copying is disabled in your browser");
      }
    },
    [text, onCopy]
  );

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => {
      if (isCopyEnabled) {
        setTooltipText(initialToolTipText);
      }
    }, 500);
  }, [initialToolTipText, isCopyEnabled]);

  return (
    <Tooltip
      title={tooltipText}
      placement="top"
      onMouseLeave={handleMouseLeave}
    >
      <IconButton
        aria-label={initialToolTipText}
        onClick={handleCopy}
        size="small"
        className={className}
        disabled={!isCopyEnabled}
      >
        {children ?? (
          <SvgIcon
            component={ContentCopyIcon}
            inheritViewBox
            fontSize="small"
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
