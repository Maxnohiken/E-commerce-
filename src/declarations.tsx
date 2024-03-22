export interface Product {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string;
  description: string;
}

export interface TContext {
  username: string;
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
  login: (username: string) => void;
  logout: () => void;
  searchTerm: string; // Aggiungi searchTerm al tipo TContext
  setSearchTerm: (term: string) => void; // Aggiungi setSearchTerm al tipo TContext
  filteredProducts: Product[]; // Aggiungi filteredProducts al tipo TContext
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Aggiungi handleSearchChange al tipo TContext
}
