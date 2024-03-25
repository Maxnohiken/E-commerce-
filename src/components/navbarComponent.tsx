import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  Divider,
  Box 
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "./cart";
import { AppContext } from "../Context";
import RouteLoginButton from "./login";

export default function DrawerAppBar() {
  const { username, admin, logout } = useContext(AppContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar component="nav" position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}> 
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}> 
            {username ? (
              <Button color="inherit" onClick={logout}>
                Logout {username}
              </Button>
            ) : (
              <RouteLoginButton />
            )}
            {admin && (
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
            )}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 420,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 330,
          },
        }}
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
      >
        <Divider />
        <Cart />
      </Drawer>
    </>
  );
}
