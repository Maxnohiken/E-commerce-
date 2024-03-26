import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { AppContext } from "../Context";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export default function Cart() {
  const { getTotalProductInCart, cart, removeFromCart, emptyCart, checkout } =
    useContext(AppContext);
  useContext(AppContext);
  const total = getTotalProductInCart();

  return (
    <>
      <Typography variant="h6" component="div" style={{ cursor: "pointer" }}>
        Il mio carrello
      </Typography>
      {cart.length === 0 ? (
        <div style={{padding:"100px"}}>
          <Typography>Il carrello è vuoto</Typography>
          <ProductionQuantityLimitsIcon sx={{
            width: "130px",
            fontSize: "80px",
            color: "gray",
          }}/>
          <Typography sx={{textAlign:"center"}}>Continua con lo Shopping</Typography>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <Card
              key={item.prod.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 60, height: 60, marginRight: "16px" }}
                image={item.prod.image}
                alt={item.prod.title}
              />
              <CardContent sx={{ flex: "1 0 auto" }}>
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
                  sx={{ marginTop: "8px", fontSize: "small" }}
                >
                  Rimuovi
                </Button>
              </CardContent>
            </Card>
          ))}
          <Typography>Totale: {total}</Typography>
          <Button
            variant="contained"
            sx={{backgroundColor:"#592020", color:"white", 
            "&:hover": {
              backgroundColor: "#973030"}}
            }
            component={Link}
            to="/checkout"
            onClick={checkout}
          >
            Acquista
          </Button>
          <Button 
            onClick={emptyCart}
            sx={{backgroundColor:"grey", color:"#592020", 
            '&:hover': {
              backgroundColor: "#ff6666"}}
            }
          >Svuota Carrello</Button>
        </>
      )}
    </>
  );
}
