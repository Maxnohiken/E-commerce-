import { useContext, useEffect } from "react";
import { AppContext } from "../Context";
import CreditScore from "@mui/icons-material/CreditScore";
import { Box, Typography } from "@mui/material";

export function RouteCheckout() {
  const { onCheckoutSuccess } = useContext(AppContext);

  useEffect(() => {
    setTimeout(onCheckoutSuccess, 3000);
  }, []);

  return (
    <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    minHeight="100vh" 
  >
    <CreditScore
      sx={{
        width: "130px",
        fontSize: "80px",
        color: "gray",
      }}
    />
    <Typography variant="h1" fontFamily="Roboto" sx={{fontSize:"medium", fontWeight:"600"}}>
      Grazie per l'acquisto!
    </Typography>
    <Typography variant="body1" fontFamily="Roboto">
      A breve verrai indirizzato verso la Home...
    </Typography>
  </Box>
  );
}
