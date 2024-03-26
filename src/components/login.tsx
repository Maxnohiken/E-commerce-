import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { AppContext } from "../Context";

export default function RouteLoginButton() {
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
      <Button
        sx={{
          backgroundColor: "#592020",
          color: "white",
          margin: "3px",
          "&:hover": {
            backgroundColor: "#973030",
          },
        }}
        onClick={handleOpen}
      >
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
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "grey",
              color: "#592020",
              margin: "3px",
              "&:hover": {
                backgroundColor: "#bdabab",
              },
            }}
          >
            Cancella
          </Button>
          <Button
            onClick={handleLogin}
            sx={{
              backgroundColor: "#592020",
              color: "white",
              margin: "3px",
              "&:hover": {
                backgroundColor: "#973030",
              },
            }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
