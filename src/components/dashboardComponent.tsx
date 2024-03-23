import { useContext, useEffect, useState } from "react";
import {
  IconButton,
  Drawer,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Card } from "../components/card";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";

export default function RouteDashboard() {
  const { filteredProducts } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    quantity: "",
  });
  const [drawerWidth, setDrawerWidth] = useState(300);
  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:1234/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta del prodotto");
      }

      const addedProduct = await response.json();
      console.log("Nuovo prodotto aggiunto:", addedProduct);
    } catch (error: unknown) {
      console.error("Si è verificato un errore:", (error as Error).message);
    }
  };

  // Aggiornamento della larghezza del drawer
  useEffect(() => {
    const drawerWidth = open ? 300 : 0; // Larghezza del drawer quando è aperto
    setDrawerWidth(drawerWidth);
  }, [open]);

  return (
    <div style={{ marginLeft: drawerWidth }}>
      <Button
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: 20, right: 20, zIndex: 999 }}
      >
        Home
      </Button>
      <div style={{ position: "absolute", top: 20, left: open ? 300 : 20 }}>
        <IconButton onClick={toggleDrawer(true)} edge="start">
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <div style={{ width: 300 }}>
            <Typography variant="h6" align="center" sx={{ mt: 1, mb: 2 }}>
              Aggiungi Prodotto
            </Typography>
            <TextField
              label="Titolo"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Prezzo"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="URL Immagine"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantità"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button
              onClick={handleAddProduct}
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Aggiungi
            </Button>
          </div>
        </Drawer>
      </div>
      <Grid container spacing={2} style={{ marginLeft: 150, marginRight: 150 }}>
        {filteredProducts.map((product) => (
          <Grid item sm={6} md={3} key={product.id}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
