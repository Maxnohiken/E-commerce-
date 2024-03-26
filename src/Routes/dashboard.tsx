import { useContext, useState } from "react";
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
import HouseIcon from "@mui/icons-material/House";

export default function RouteDashboard() {
  const {
    filteredProducts,
    setFilteredProducts,
    handleDeleteProduct,
    products,
    setProducts,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    quantity: "",
  });

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
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

      setFilteredProducts([...filteredProducts, addedProduct]);
      setProducts([addedProduct, ...products]);
    } catch (error: unknown) {
      console.error("Si è verificato un errore:", (error as Error).message);
    }
  };
  if (products.length === 0)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Nessun Prodotto Disponibile</Typography>
      </div>
    );
  return (
    <div>
      <Button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 999,
          color: "#592020",
        }}
      >
        <HouseIcon />
      </Button>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerOpen}
        style={{ position: "relative" }}
      >
        <MenuIcon />
      </IconButton>
      <div>
        <Drawer
          sx={{
            width: "38%",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "38%",
              padding: "10px",
            },
          }}
          anchor="left"
          open={openDrawer}
          onClose={handleDrawerClose}
        >
          <div style={{ width: 700, padding: 20 }}>
            <Typography variant="h6" align="center" gutterBottom>
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
              type="number"
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
              type="number"
            />
            <Button
              onClick={handleAddProduct}
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: "#592020",
                color: "white",
                margin: "3px",
                "&:hover": {
                  backgroundColor: "#973030",
                },
              }}
            >
              Aggiungi
            </Button>
            <Button
              onClick={handleDrawerClose}
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                backgroundColor: "grey",
                color: "#592020",
                margin: "3px",
                "&:hover": {
                  backgroundColor: "#bdabab",
                },
              }}
            >
              Chiudi
            </Button>
          </div>
        </Drawer>
      </div>
      <Grid
        container
        spacing={2}
        style={{
          marginTop: 60,
          padding: "60px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {filteredProducts.map((product) => (
          <Grid
            item
            sm={6}
            md={3}
            key={product.id}
            sx={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Card product={product} handleDeleteProduct={handleDeleteProduct} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
