import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Layouts from "./components/Layouts";

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
