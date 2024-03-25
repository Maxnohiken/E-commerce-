import { createContext, ReactNode, useEffect, useState } from "react";
import { TContext, Product } from "./declarations";

export const AppContext = createContext<TContext>({
  username: "",
  password: "",
  products: [],
  cart: [],
  paid: false,
  admin: false,
  filteredProducts: [],
  searchTerm: "",
  addToCart: () => {},
  removeFromCart: () => {},
  checkout: () => {},
  getTotalProductInCart: () => 0,
  onCheckoutSuccess: () => {},
  getTotalAvailableProduct: () => 0,
  login: () => {},
  logout: () => {},
  setSearchTerm: () => {},
  setFilteredProducts: () => {},
  setAdmin: () => {},
  handleSearchChange: () => {},
  handleDeleteProduct: () => {},
  getProducts: () => {},
  setProducts: () => {},
});

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [cart, setCart] = useState<Array<{ prod: Product; qty: number }>>([]);
  const [paid, setPaid] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [admin, setAdmin] = useState<boolean>(false);
  const [users, setUsers] =
    useState<Array<{ username: string; password: string }>>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function getProducts() {
    try {
      const apiUrl = "http://localhost:1234";

      const response = await fetch(`${apiUrl}/products`);
      if (!response.ok) {
        throw new Error("Errore nella richiesta dei dati");
      }

      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(
        "Si è verificato un errore durante il recupero dei dati:",
        error
      );
    }
  }
  async function getUsers() {
    try {
      const apiUrl = "http://localhost:1234";
      const response = await fetch(`${apiUrl}/users`);
      if (!response.ok) {
        throw new Error("Errore nella richiesta dei dati degli utenti");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(
        "Si è verificato un errore durante il recupero dei dati degli utenti:",
        error
      );
    }
  }

  function removeFromCart(idProduct: Product["id"]) {
    const productFound = cart.find(
      (cartProduct) => cartProduct.prod.id === idProduct
    );
    if (!!productFound && productFound.qty === 1) {
      const newCart = cart.filter(
        (productCart) => productCart.prod.id !== idProduct
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    if (!!productFound && productFound.qty > 1) {
      const newCart = cart.map((cartProduct) => {
        if (idProduct === cartProduct.prod.id)
          return { ...cartProduct, qty: cartProduct.qty - 1 };
        return cartProduct;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }

  function addToCart(product: Product, num: number) {
    const productFound = cart.find(
      (productCart) => product.id === productCart.prod.id
    );
    if (!productFound) {
      const newCart = [...cart, { prod: product, qty: num }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = cart.map((productCart) =>
        product.id === productCart.prod.id
          ? { ...productCart, qty: productCart.qty + num }
          : { ...productCart }
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }

  function checkout() {
    setPaid(true);
    setCart([]);
  }

  function onCheckoutSuccess() {
    setPaid(false);
  }

  function getTotalProductInCart() {
    const total = cart.reduce((acc, productCart) => {
      return acc + productCart.qty;
    }, 0);
    return total;
  }

  function getTotalAvailableProduct(product: Product) {
    const productInCart = cart.find(({ prod }) => prod.id === product.id);
    const totalProductInCart = productInCart ? productInCart.qty : 0;
    return product.quantity - totalProductInCart;
  }

  function login(username: string, password: string) {
    const user = users?.find((user) => user.username === username);

    if (!user) {
      alert("User not found");
      return false;
    }

    if (user.password === password) {
      const userData = {
        username: username,
        admin: true,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUsername(username);
      setAdmin(true);
      setPassword(password);
      return true;
    } else {
      alert("Incorrect password");
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("user");
    setUsername("");
    setAdmin(false);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:1234/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del prodotto");
      }

      // Rimuovi il prodotto eliminato dall'elenco dei prodotti filtrati
      const updatedProducts = filteredProducts.filter(
        (product) => product.id !== id
      );
      setFilteredProducts(updatedProducts);
      setProducts(updatedProducts);
    } catch (error: unknown) {
      console.error("Si è verificato un errore:", (error as Error).message);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { username, admin } = JSON.parse(userData);
      setUsername(username);
      setAdmin(admin);
    }
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    getProducts();
    getUsers();
  }, []);

  return (
    <AppContext.Provider
      value={{
        username,
        password,
        products,
        cart,
        paid,
        addToCart,
        removeFromCart,
        checkout,
        getTotalProductInCart,
        onCheckoutSuccess,
        getTotalAvailableProduct,
        login,
        logout,
        searchTerm,
        setSearchTerm,
        filteredProducts,
        handleSearchChange,
        admin,
        setFilteredProducts,
        setAdmin,
        handleDeleteProduct,
        getProducts,
        setProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
