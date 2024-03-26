import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { ContextProvider } from "./Context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <div style={{backgroundColor:"#e0c974"}}>
     <App />
    </div>
  </ContextProvider>
);
