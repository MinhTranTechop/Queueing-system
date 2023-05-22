
import React from "react";
import "./App.css";
import Navbar from "./components/Bar/ts/Sidebar";
import SignIn from "./pages/SignIn";
import ForgetPass from "./pages/ForgetPass";
import NewPass from "./pages/NewPass";
import Profile from "./pages/Profile";
import Notify from "./components/Bar/ts/Notify";
import AddEquip from "./components/EquipmentManagement/AddEquip";
import ListEquip from "./components/EquipmentManagement/ListEquip";
import DetailEquip from "./components/EquipmentManagement/DetailEquip";
import UpdateEquip from "./components/EquipmentManagement/UpdateEquip";
import Pagination from "./components/Bar/ts/Paging";
import ListService from "./components/ServiceManagement/ts/ListService";
import AddService from "./components/ServiceManagement/ts/AddService";
import DetailService from "./components/ServiceManagement/ts/DetailService";
import UpdateService from "./components/ServiceManagement/ts/UpdateService";
import ListProgression from "./components/ProgressionManagement/ts/ListProgression";
import AddProgression from "./components/ProgressionManagement/ts/AddProgression";
import DetailProgression from "./components/ProgressionManagement/ts/DetailProgression";
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
          <Route path="/DetallEq/:id" element={<DetailEquip/>}/>
          <Route path="/UpdateEq/:id" element={<UpdateEquip/>}/>
          <Route path="/paging" element={<Pagination itemsPerPage={10} totalItems={2}/>}/>
          <Route path="/ListSv" element={<ListService/>}/> 
          <Route path="/ListPr" element={<ListProgression/>}/> 
          <Route path="/AddPr" element={<AddProgression/>}/> 
          <Route path="/DetailPr/:id" element={<DetailProgression/>}/> 
          <Route path="/AddSv" element={<AddService/>}/>
          <Route path="/UpdateSv/:id" element={<UpdateService/>}/>
          <Route path="/DetailSv/:id" element={<DetailService/>}/>
          </Routes>
          </Router>
      
    </div>
  );
};

export default App;
