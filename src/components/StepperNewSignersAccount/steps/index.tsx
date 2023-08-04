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

const withCard = (
  WrappedComponent: React.ComponentType<any>,
  title: string
) => {
  const WithCardComponent = (props: any) => (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Divider />
        <WrappedComponent {...props} />
      </CardContent>
      {props.footer && <CardActions>{props.footer}</CardActions>}
    </Card>
  );

  WithCardComponent.displayName = `WithCard(${getDisplayName(
    WrappedComponent
  )})`;
  return WithCardComponent;
};

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withCard;

export { OwnersStep, ReviewStep, WalletCreationStep };
