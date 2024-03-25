import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { AppContext } from "../Context";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getTotalProductInCart, cart, removeFromCart, emptyCart } =
    useContext(AppContext);
  useContext(AppContext);
  const total = getTotalProductInCart();

  return (
    <>
      <Typography variant="h6" component="div" style={{ cursor: "pointer" }}>
        Il mio carrello
      </Typography>
      {cart.length === 0 ? (
        <Typography>Il carrello è vuoto</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.prod.id}>
              <img
                src={item.prod.image}
                alt={item.prod.title}
                style={{ width: "50px", height: "50px" }}
              />
              {item.prod.title} - {item.prod.price}
              <Typography variant="body2" color="text.secondary">
                Disponibilità: {item.qty}
              </Typography>
              <Button onClick={() => removeFromCart(item.prod.id)}>
                Rimuovi
              </Button>
            </div>
          ))}
          <Typography>Totale: {total}</Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Acquista
          </Button>
          <Button onClick={emptyCart}>Svuota Carrello</Button>
        </>
      )}
    </>
  );
}
