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

const DrawerAppBar = () => {
  const {
    username,
    admin,
    handleSearchChange,
    searchTerm,
    logout,
  } = useContext(AppContext);
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
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <TextField
              label=""
              placeholder="Search"
              variant="outlined"
              fullWidth
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ backgroundColor: "white", width:"400px" }} // Imposta lo sfondo bianco
            />
          </Box>
          {username ? (
            <Button color="inherit" onClick={logout}>
              Logout {username}
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
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
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
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
