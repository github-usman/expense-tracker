import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <Layouts>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Layouts>
    </Router>
  );
}

export default App;
