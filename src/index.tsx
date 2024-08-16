import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import DataProvider from "./containers/DataProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <DataProvider>
    <App />
  </DataProvider>
);
