import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  Drawer,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from "./cart";
import { AppContext } from "../Context";
import RouteLoginButton from "./login";

const DrawerAppBar = () => {
  const { username, admin, handleSearchChange, searchTerm, logout } =
    useContext(AppContext);
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
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
            }}
          >
            <TextField
              label=""
              placeholder="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              style={{
                backgroundColor: "white",
                color: "white",
                width: "600px",
                maxWidth: "80%",
              }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>
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
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 320,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 320,
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
};

export default DrawerAppBar;