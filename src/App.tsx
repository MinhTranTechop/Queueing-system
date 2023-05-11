
import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Sidebar";
import SignIn from "./pages/SignIn";
import ForgetPass from "./pages/ForgetPass";
import NewPass from "./pages/NewPass";
import Profile from "./pages/Profile";
import Notify from "./components/Notify";
import AddEquip from "./components/EquipmentManagement/AddEquip";
import ListEquip from "./components/EquipmentManagement/ListEquip";
import DetailEquip from "./components/EquipmentManagement/DetailEquip";
import UpdateEquip from "./components/EquipmentManagement/UpdateEquip";
import Pagination from "./components/Paging";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"



const App = () => {
  

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/ForgetPass" element={<ForgetPass />} />
          <Route path="/Changepass/:userId" element={<NewPass />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/notify" element={<Notify/>}/>
          <Route path="/AddEq" element={<AddEquip/>}/>
          <Route path="/ListEq" element={<ListEquip/>}/>
          <Route path="/DetallEq/:Id_Eq" element={<DetailEquip/>}/>
          <Route path="/UpdateEq/:Id_Eq" element={<UpdateEquip/>}/>
          <Route path="/paging" element={<Pagination itemsPerPage={10} totalItems={2}/>}/> 
          </Routes>
          </Router>
      
    </div>
  );
};

export default App;
