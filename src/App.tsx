// Trong file khai báo route
import "./App.css";
import Navbar from "./components/Sidebar";
import SignIn from "./pages/SignIn";
import ForgetPass from "./pages/ForgetPass";
import NewPass from "./pages/NewPass";
import Profile from "./pages/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";





const App = () => {

  return (
    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/ForgetPass" element={<ForgetPass />} />
          <Route path="/Changepass" element={<NewPass  />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
