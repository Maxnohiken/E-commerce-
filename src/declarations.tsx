export interface Product {
  id: number;
  title: string;
  price: number;
  count: number;
  image: string;
  description: string;
}

export interface TContext {
  username: string;
  password: string;
  products: Array<Product>;
  cart: Array<{ prod: Product; qty: number }>;
  paid: boolean;
  admin: boolean;
  addToCart: (product: Product, num: number) => void;
  removeFromCart: (idProduct: Product["id"]) => void;
  checkout: () => void;
  getTotalProductInCart: () => number;
  onCheckoutSuccess: () => void;
  getTotalAvailableProduct: (product: Product) => number;
  login: (username: string, password: string) => void;
  logout: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  setAdmin: (admin: boolean) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteProduct: (id: number) => void;
}
