import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/home";
import Katalog from "./Pages/katalog";
import Petunjuk from "./Pages/petunjuk";
import Detail from "./Pages/detail";
import Dongeng from "./Pages/dongeng";

import Login from "./Pages/login"
import Register from "./Pages/register"
import Logout from "./Pages/logout"

import User from "./Pages/user"
import UpdateUser from "./Pages/updateUser"
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/Petunjuk" element={<Petunjuk />} />
          <Route path="/dongeng/detail/:id" element={<Detail />} />
          <Route path="/dongeng/read" element={<Dongeng />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/users" element={<User />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />
        </Routes>
      </Router >
    </>
  );
}

export default App;
