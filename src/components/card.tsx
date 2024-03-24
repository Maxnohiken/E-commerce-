import MaterialCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../Context";
import { Product } from "../declarations";
import { Link, useLocation } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/AddShoppingCart";

interface Props {
  product: Product;
  handleDeleteProduct: (id: number) => void;
}

export function Card({ product }: Props) {
  const {
    addToCart,
    getTotalAvailableProduct,
    admin,

    handleDeleteProduct,
  } = useContext(AppContext);

  const totalAvailable = getTotalAvailableProduct(product);
  const [input, setInput] = useState(1);
  const location = useLocation();
  console.log("admin", admin);
  return (
    <MaterialCard
      sx={{
        position: "relative",
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {location.pathname === "/dashboard" && admin && (
        <Button
          variant="contained"
          color="error"
          size="small" // Imposta la dimensione del bottone su "small"
          style={{ position: "absolute", top: 0, right: 0, zIndex: 999 }}
          onClick={() => handleDeleteProduct(product.id)}
        >
          Elimina
        </Button>
      )}
      <CardActionArea>
        <Link to={`/p/${product.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.title}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span>Disponibilità {totalAvailable}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          endIcon={<ShoppingCart />}
          disabled={totalAvailable === 0}
          onClick={() => addToCart(product, input)}
        >
          {totalAvailable > 1 ? "Aggiungi al carrello" : "Non disponibile"}
        </Button>
      </CardActions>
    </MaterialCard>
  );
}
