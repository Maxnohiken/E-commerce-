import { Container, Grid } from "@mui/material";
import { AppContext } from "../Context";
import { useContext } from "react";
import { Card } from "../components/card";

export function RouteHome() {
  const { filteredProducts } = useContext(AppContext);

  return (
    <>
      <Container maxWidth="lg">
        <h1>Home</h1>

        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item sm={6} md={3} key={product.id}>
              <Card product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
