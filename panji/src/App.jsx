import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/home";
import Katalog from "./Pages/katalog";
import Petunjuk from "./Pages/petunjuk";
import Detail from "./Pages/detail";
import DongengView from "./Pages/dongengView"

import Login from "./Pages/login"
import Register from "./Pages/register"
import Logout from "./Pages/logout"

import User from "./Pages/user"
import UpdateUser from "./Pages/updateUser"
import AddUser from "./Pages/addUser"

import Dongeng from "./Pages/dongeng"
import UpdateDongeng from "./Pages/updateDongeng"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/Petunjuk" element={<Petunjuk />} />
          <Route path="/dongeng/detail/:id" element={<Detail />} />
          <Route path="/dongeng/read" element={<DongengView />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/users" element={<User />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />

          <Route path="/dongeng" element={<Dongeng />} />
          <Route path="/dongeng/update/:id" element={<UpdateDongeng />} />
        </Routes>
      </Router >
    </>
  );
}

export default App;
