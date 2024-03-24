import { Container, Grid } from "@mui/material";
import { AppContext } from "../Context";
import { useContext } from "react";
import { Card } from "../components/card";
import DrawerAppBar from "../components/navbarComponent";

export function RouteHome() {
  const { filteredProducts, paid } = useContext(AppContext);

  return (
    <>
      {" "}
      {!paid && <DrawerAppBar />}
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
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
