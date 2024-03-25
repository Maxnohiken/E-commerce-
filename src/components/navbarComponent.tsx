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
import Badge from "@mui/material/Badge";
import { AppContext } from "../Context";
import RouteLoginButton from "./login";

export default function DrawerAppBar() {
  const { username, admin, logout } = useContext(AppContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { getTotalProductInCart } = useContext(AppContext);
  const total = getTotalProductInCart();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar component="nav" position="static" sx={{backgroundColor: "#592020"}}>
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
      style={{ position: 'relative' }}
    >
      <ShoppingCartIcon />
      {total > 0 && (
        <Badge 
          badgeContent={total} 
          color="error"
          overlap="circular"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          style={{ position: 'absolute', top: 0, right: 0 ,width: 40, height: 40 }}
        />
      )}
      </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 340,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 340,
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
