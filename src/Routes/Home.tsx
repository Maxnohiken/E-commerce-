import { Box, Container, Grid, TextField } from "@mui/material";
import { AppContext } from "../Context";
import { useContext } from "react";
import { Card } from "../components/card";
import DrawerAppBar from "../components/navbarComponent";

export function RouteHome() {
  const { filteredProducts, paid, handleDeleteProduct, searchTerm, handleSearchChange } = useContext(AppContext);

  return (
    <>
      {!paid && <DrawerAppBar />}
      <Box display="flex" justifyContent="center" alignItems="center" padding={2} width="85%" margin="0 auto">
        <h1>Prodotti</h1>
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <TextField
            label=""
            placeholder="Ricerca Prodotto"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: "200px", height: "40px" }} 
          />
        </Box>
      </Box>
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
