import { Box, Typography } from "@mui/material";

import ExecutionStep from "./ExecutionStep";
import OwnersStep from "./OwnersStep";
import ReviewStep from "./ReviewStep";
import WalletCreationStep from "./WalletCreationStep";

interface IBoxFooter {
  footer?: React.ReactNode;
}

const withCard = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  title: string
) => {
  const WithCardComponent: React.FC<P & IBoxFooter> = (props: IBoxFooter) => {
    return (
      <Box>
        <Box p={5} mr={8}>
          <Typography variant="h4">{title}</Typography>
          <WrappedComponent {...(props as P)} />
        </Box>
        {props.footer && <Box p={5}>{props.footer}</Box>}
      </Box>
    );
  };

  WithCardComponent.displayName = `WithCard(${getDisplayName(
    WrappedComponent
  )})`;
  return WithCardComponent;
};

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export { ExecutionStep, OwnersStep, ReviewStep, WalletCreationStep, withCard };
