import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import OwnersStep from "./OwnersStep";
import ReviewStep from "./ReviewStep";
import WalletCreationStep from "./WalletCreationStep";

interface ICardFooter {
  footer?: React.ReactNode;
}

const withCard = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  title: string
) => {
  const WithCardComponent: React.FC<P & ICardFooter> = (props: ICardFooter) => (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Divider />
        <WrappedComponent {...(props as P)} />
      </CardContent>
      {props.footer && <CardActions>{props.footer}</CardActions>}
    </Card>
  );

  WithCardComponent.displayName = `WithCard(${getDisplayName(
    WrappedComponent
  )})`;
  return WithCardComponent;
};

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export { OwnersStep, ReviewStep, WalletCreationStep, withCard };
