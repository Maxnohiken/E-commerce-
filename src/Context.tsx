import { createContext, ReactNode, useState } from "react";
import { TContext, Product } from "./declarations";

export const AppContext = createContext<TContext>({
  username: "",
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

const utilityGetPreviousUsername = () => {
  const username = localStorage.getItem("username");
  return username || "";
};
export function ContextProvider({ children }: Props) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [cart, setCart] = useState<Array<{ prod: Product; qty: number }>>([]);
  const [paid, setPaid] = useState<boolean>(false);
  const initUsername = utilityGetPreviousUsername();
  const [username, setUsername] = useState<string>(initUsername);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
}
