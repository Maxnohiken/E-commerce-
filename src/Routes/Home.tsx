import { Box, Container, Grid, TextField } from "@mui/material";
import { AppContext } from "../Context";
import { useContext } from "react";
import { Card } from "../components/card";
import DrawerAppBar from "../components/navbarComponent";

export function RouteHome() {
  const { filteredProducts, paid, handleDeleteProduct,searchTerm, handleSearchChange } =
    useContext(AppContext);

  return (
    <>
      {!paid && <DrawerAppBar />}
      <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
            }}
          >
            <TextField
              label=""
              placeholder="Ricerca Prodotto"
              variant="outlined"
              fullWidth
              margin="normal"
              style={{
                backgroundColor: "white",
                color: "white",
                width: "400px",
                maxWidth: "50%",
              }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item sm={6} md={3} key={product.id}>
              <Card
                product={product}
                handleDeleteProduct={handleDeleteProduct}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
