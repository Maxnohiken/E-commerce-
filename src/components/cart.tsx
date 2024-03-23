import { useContext, useState } from "react";
import { AppContext } from "../Context";
import { IconButton, Badge, Menu, MenuItem, Button } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

const Cart = () => {
  const { getTotalProductInCart, cart, removeFromCart } = useContext(AppContext);
  const total = getTotalProductInCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="cart" onClick={(event) => handleCartClick(event)}>
        <Badge badgeContent={total} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Menu id="cart-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {cart.map((item) => (
          <MenuItem key={item.prod.id}>
            <img src={item.prod.image} alt={item.prod.title} style={{ width: "50px", height: "50px" }} />
            {item.prod.title} - {item.prod.price}
            <Button onClick={() => removeFromCart(item.prod.id)}>Rimuovi</Button>
          </MenuItem>
        ))}
        <MenuItem>
          <Button variant="contained" color="primary">
            Acquista
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Cart;
