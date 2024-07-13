// import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./Components/header";
// import Footer from "./Components/footer";
import Home from "./Pages/home";
import Katalog from "./Pages/katalog";
import Petunjuk from "./Pages/petunjuk";
import Detail from "./Pages/detail";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/Petunjuk" element={<Petunjuk />} />
          <Route path="/katalog/detail/:id" element={<Detail />} />
        </Routes>
      </Router >
    </>
  );
}

export default App;
