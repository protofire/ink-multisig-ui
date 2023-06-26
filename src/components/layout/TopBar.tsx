import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { WalletConnect } from '../WalletConnect';

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Multisig-UI
        </Typography>
        <WalletConnect />
      </Toolbar>
    </AppBar>
  );
}