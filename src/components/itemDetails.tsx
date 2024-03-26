import {
  Typography,
  Card as MaterialCard,
  Button,
  DialogContent,
  Dialog,
  CardMedia,
} from "@mui/material";
import { useContext, useState } from "react";
import { Product } from "../declarations";
import { ShoppingCart } from "@mui/icons-material";
import { AppContext } from "../Context";

interface Props {
  product: Product;
}

export default function ItemDetails({ product }: Props) {
  const { addToCart, getTotalAvailableProduct } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [input] = useState(1);
  const totalAvailable = getTotalAvailableProduct(product);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MaterialCard>
      <div onClick={handleOpen} style={{ border: "none", outline: "none" }}>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
        />
        <Typography
          variant="h6"
          sx={{ fontSize: "medium", fontWeight: "bold" }}
        >
          {product.title}
        </Typography>
      </div>
      s
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ border: "none", outline: "none" }}
      >
        <DialogContent style={{ width: "440px" }}>
          <div>
            <CardMedia
              component="img"
              height="300"
              image={product.image}
              alt={product.title}
            />
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body1" sx={{ fontSize: "small" }}>
              {product.description}
            </Typography>
            <Typography variant="body2">Prezzo: {product.price} €</Typography>
            <Typography variant="body2" color="text.secondary">
              <span>Disponibilità {totalAvailable}</span>
            </Typography>
            <Button
              variant="contained"
              endIcon={<ShoppingCart />}
              disabled={totalAvailable === 0}
              onClick={() => addToCart(product, input)}
              sx={{
                backgroundColor: "#592020",
                color: "white",
                margin: "3px",
                "&:hover": {
                  backgroundColor: "#973030",
                },
              }}
            >
              {totalAvailable >= 1 ? "Aggiungi al carrello" : "Non disponibile"}
            </Button>
          </div>
          <Button onClick={handleClose}></Button>
        </DialogContent>
      </Dialog>
    </MaterialCard>
  );
}
