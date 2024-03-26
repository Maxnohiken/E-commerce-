import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card as MaterialCard,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { AppContext } from "../Context";
import { Product } from "../declarations";
import ItemModify from "./itemModify";
import ItemDetails from "./itemDetails";

interface Props {
  product: Product;
  handleDeleteProduct: (id: number) => void;
}

export function Card({ product, handleDeleteProduct }: Props) {
  const { addToCart, getTotalAvailableProduct, admin } = useContext(AppContext);
  const totalAvailable = getTotalAvailableProduct(product);
  const [input] = useState(1);

  const location = useLocation();

  return (
    <MaterialCard
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        margin: "10px",
        maxWidth: "250px",
        minWidth: "200px",
        borderRadius: "15px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      {location.pathname === "/dashboard" && admin && (
        <div>
          <Button
            variant="contained"
            color="error"
            size="small"
            style={{ position: "absolute", top: 0, right: 0, zIndex: 999 }}
            onClick={() => handleDeleteProduct(product.id)}
          >
            Elimina
          </Button>
        </div>
      )}
      <CardActionArea>
        <CardContent sx={{ padding: "15px" }}>
          {location.pathname === "/" ? (
            <ItemDetails product={product} />
          ) : (
            <div>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <Typography>{product.title}</Typography>
            </div>
          )}
          <Typography variant="body2" color="text.secondary">
            {product.price} €
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span>Disponibilità {totalAvailable}</span>
          </Typography>
          {location.pathname === "/dashboard" && admin && (
            <ItemModify product={product} />
          )}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {location.pathname === "/" && (
          <Button
            sx={{ backgroundColor: "#592020",
            color: "white",
            margin: "3px",
            "&:hover": {
              backgroundColor: "#973030" }}}
            variant="contained"
            endIcon={<ShoppingCart />}
            disabled={totalAvailable === 0}
            onClick={() => addToCart(product, input)}
          >
            {totalAvailable >= 1 ? "Aggiungi al carrello" : "Non disponibile"}
          </Button>
        )}
      </CardActions>
    </MaterialCard>
  );
}
