import { Container, Grid, TextField } from "@mui/material";
import { AppContext } from "../Context";
import { useContext } from "react";
import { Card } from "../components/card";
import DrawerAppBar from "../components/navbarComponent";
import Unsplash from "../components/unsplash";

export function RouteHome() {
  const { filteredProducts, paid, handleDeleteProduct, searchTerm, handleSearchChange } = useContext(AppContext);

  return (
    <>
      {!paid && <DrawerAppBar />}
      <Unsplash />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width:"85%", margin:"auto" }}>
        <h2 style={{ textAlign: "right", color: "black", marginRight: "auto" }}>Prodotti</h2>
        <div style={{ flex: "1", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <TextField
            label=""
            placeholder="Ricerca Prodotto"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "white",
              width: "200px",
              maxWidth: "50%",
              maxHeight:"30px",
              '& div': { maxHeight:'30px'}
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item sm={6} md={3} key={product.id}>
              <Card product={product} handleDeleteProduct={handleDeleteProduct} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
