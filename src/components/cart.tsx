import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { AppContext } from "../Context";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

export default function Cart() {
  const { getTotalProductInCart, cart, removeFromCart, emptyCart, checkout } =
    useContext(AppContext);
  useContext(AppContext);
  const total = getTotalProductInCart();

  const TotalPrice = () => {
    let TotalPrice = 0;
    cart.forEach((item) => {
      TotalPrice += item.prod.price * item.qty;
    });
    return TotalPrice.toFixed(2);
  };

  return (
    <>
      <Typography variant="h6" component="div" style={{ cursor: "pointer" }}>
        Il mio carrello
      </Typography>
      {cart.length === 0 ? (
        <div style={{ padding: "100px" }}>
          <Typography sx={{ textAlign: "center" }}>
            Il carrello è vuoto
          </Typography>
          <ProductionQuantityLimitsIcon
            sx={{
              width: "130px",
              fontSize: "80px",
              color: "gray",
            }}
          />
          <Typography sx={{ textAlign: "center" }}>
            Continua con lo Shopping
          </Typography>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <Card
              key={item.prod.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "7px",
                margin: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 60, height: 60, margin: "5px" }}
                image={item.prod.image}
                alt={item.prod.title}
              />
              <CardContent sx={{ flex: "1 0 auto", padding: "0px" }}>
                <Typography
                  component="div"
                  variant="h6"
                  fontSize="small"
                  title={item.prod.title}
                  sx={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                    overflow: "hidden",
                  }}
                >
                  {item.prod.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {item.prod.price} €
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantità: {item.qty}
                </Typography>
                <Button
                  onClick={() => removeFromCart(item.prod.id)}
                  sx={{
                    fontSize: "small",
                    backgroundColor: "grey",
                    color: "#592020",
                    margin: "3px",
                    "&:hover": { backgroundColor: "#bdabab" },
                  }}
                >
                  Rimuovi
                </Button>
              </CardContent>
            </Card>
          ))}
          <Typography>Prodotti Totali: {total}</Typography>
          <Typography>Totale: {TotalPrice()} €</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#592020",
              color: "white",
              margin: "3px",
              "&:hover": {
                backgroundColor: "#973030",
              },
            }}
            component={Link}
            to="/checkout"
            onClick={checkout}
          >
            Acquista
          </Button>
          <Button
            onClick={emptyCart}
            sx={{
              backgroundColor: "grey",
              color: "#592020",
              margin: "3px",
              "&:hover": {
                backgroundColor: "#bdabab",
              },
            }}
          >
            Svuota Carrello
          </Button>
        </>
      )}
    </>
  );
}
