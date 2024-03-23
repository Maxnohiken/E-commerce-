import { Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import Cart from "./cart";


const DrawerAppBar = () => {
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
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "1" }}>
            <TextField
              label=""
              placeholder="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              style={{ backgroundColor: "white", color: "white", width: "600px", maxWidth: "80%" }}
            />
          </Box>
          <Cart />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default DrawerAppBar;
