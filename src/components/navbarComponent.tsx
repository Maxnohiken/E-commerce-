import { CssBaseline, AppBar, Toolbar, Typography, Box, TextField, IconButton, Badge, Button, Menu, MenuItem } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../Context";

export default function DrawerAppBar() {
    const {
      getTotalProductInCart,
      logout,
      username,
      admin, 
      searchTerm,
      handleSearchChange,
      cart,
      removeFromCart,
    } = useContext(AppContext);
  
    const total = getTotalProductInCart();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleCartClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <CssBaseline />
        <AppBar component="nav" position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ marginRight: "auto", marginBottom: "5px" }} 
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginBottom: "10px",
                }}
              >
              Home
              </Link>
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "1",
                marginRight: "auto",
              }}
            >
              <TextField
                label=""
                placeholder="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
                style={{
                  backgroundColor: "white",
                  color: "white",
                  width: "600px",
                  maxWidth: "80%",
                }}
              />
            </Box>
            <Box>
              <IconButton
                aria-label="cart"
                onClick={handleCartClick} 
                sx={{ color: "white" }}
              >
                <Badge badgeContent={total} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {!!username && (
                <Button sx={{ color: "#fff" }} onClick={logout}>
                  Logout {username}
                </Button>
              )}
              {admin && (
                <Button component={Link} to="/Dashboard" sx={{ color: "#fff" }}>
                  Dashboard
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Menu
          id="cart-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {cart.map((item) => (
            <MenuItem key={item.id}>
               <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px" }} />
              {item.name} - {item.price}
              <Button onClick={() => removeFromCart(item.id)}>Rimuovi</Button>
            </MenuItem>
          ))}
          <MenuItem>
            <Button variant="contained" color="primary">Acquista</Button>
          </MenuItem>
        </Menu>
      </>
    );
  }
