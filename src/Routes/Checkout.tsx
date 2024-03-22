import { useContext, useEffect } from "react";
import { AppContext } from "../Context";

export function RouteCheckout() {
  const { onCheckoutSuccess } = useContext(AppContext);

  useEffect(() => {
    setTimeout(onCheckoutSuccess, 3000);
  }, []);

  return (
    <div>
      <h1>Grazie per l'acquisto!</h1>
      <p>A breve verrai indirizzato verso la Home...</p>
    </div>
  );
}
