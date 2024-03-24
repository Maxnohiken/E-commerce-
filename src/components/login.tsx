import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { AppContext } from "../Context";

const RouteLoginButton = () => {
  const { login } = useContext(AppContext);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    login(inputUsername, inputPassword);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInputUsername("");
    setInputPassword("");
  };

  return (
    <>
      <Button color="inherit" onClick={handleOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RouteLoginButton;
