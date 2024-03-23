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
  handleSearchChange: () => {},
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
    const response = await fetch("http://localhost:1234/products");
    const data: Array<Product> = await response.json();
    setProducts(data);
    setFilteredProducts(data);
  }

  async function getUsers() {
    const response = await fetch("http://localhost:1234/users");
    const data = await response.json();
    setUsers(data);
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
    }
    if (!!productFound && productFound.qty > 1) {
      const newCart = cart.map((cartProduct) => {
        if (idProduct === cartProduct.prod.id)
          return { ...cartProduct, qty: cartProduct.qty - 1 };
        return cartProduct;
      });
      setCart(newCart);
    }
  }

  function addToCart(product: Product, num: number) {
    const productFound = cart.find(
      (productCart) => product.id === productCart.prod.id
    );
    if (!productFound) {
      const newCart = [...cart, { prod: product, qty: num }];
      setCart(newCart);
    } else {
      const newCart = cart.map((productCart) =>
        product.id === productCart.prod.id
          ? { ...productCart, qty: productCart.qty + num }
          : { ...productCart }
      );
      setCart(newCart);
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
    return product.count - totalProductInCart;
  }

  useEffect(() => {
    getProducts();
    getUsers();
  }, []);

  function login(username: string, password: string) {
    const user = users?.find((user) => user.username === username);
    setUsername(username);
    if (user) {
      if (user.password === password) {
        setPassword(password);
        sessionStorage.setItem("username", username);
        setAdmin(true);
      } else {
        return false;
      }
    } else {
      alert("User not found");
      return false;
    }
  }

  function logout() {
    sessionStorage.removeItem("username");
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
