import React, { useState } from "react";
import logoAlta from "../assets/logo.png";
import "./css/SignIn.css";
import group from "../assets/Group341.png";
import { Link , useNavigate  } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ref, child, get } from "firebase/database";
import  {database , auth }  from "../firebase";
import waring from "../assets/warning.png";



interface User {
  id:string;
  Name_User:string;
  userName: string;
  password: string;

}
const dbRef = ref(database);

get(child(dbRef, `users`)).then((snapshot) => {
  if (snapshot.exists()) {

    const data = (snapshot.val()) ;
    console.log(data);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
 const SignIn  = () => {
  const navigate = useNavigate();
  

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userRef = database.ref("users").orderByChild("userName").equalTo(userName);
      const snapshot = await userRef.once("value");
      const userData = snapshot.val();

      
      if (!userData) {
         
        setError("Sai mật khẩu hoặc tên đăng nhập");
        
        return;
      }
       const userId = Object.keys(userData)[0] ;
     const user = userData[userId] as User;
     const userame= userData[userId].Name_User as User;
    console.log(userame)
     localStorage.setItem('id',userId);
     localStorage.setItem('Name_User',userame.toString());
      if (user.password.toString() !== password) {
        
        setError("Sai mật khẩu hoặc tên đăng nhập ");
        
        return ;
      }
      //Login successful
      
       navigate(`/profile/${userId}`);
  

      
      
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };


const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = showPassword ? "text" : "password";
  return (
    <div className="wrapper">
      <div className="login_wrapper">
        <div>
          <img className="logologin" src={logoAlta} />
        </div>
        <form className="login-form">
          <label className="label_login">
            <p>Tên đăng nhập *</p>
        {error?
        <input className="usertextError" type="text"value={userName} onChange={(e) => setUserName(e.target.value)} />
        :<input className="usertext" type="text"value={userName} onChange={(e) => setUserName(e.target.value)} />}
          </label>
          <label className="label_pass">
            <p>Mật khẩu *</p>
            {error?<input
              className="passtextError"
              type={inputType}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value) }
            />:
            <input
              className="passtext"
              type={inputType}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value) }
            />}
          </label>
          
          <div className="eyes">
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={toggleShowPassword}
            />
          </div>
          <div>
            <Link to="/ForgetPass">
              <label className="forgetPass">
               {error ?<div className="errorFP"> <img src={waring}/>  <p className="errorCode">{error}</p></div>:
               <span>Quên mật khẩu?</span>
              }
                
              </label>
            </Link>
          </div>
          
          
        </form>
        <button className="btnDN" type="submit"onClick={handleLogin}>
              Đăng nhập
            </button>
           
        <div>
        <Link className="link-nav" to="/ForgetPass">
              <label className="forgetPassnew">
          {error? <span>Quên mật khẩu?</span>: <span></span>}
          </label>
            </Link>
        </div>
      </div>
      <div className="pritureLogin">
        <div className="infLogin">
          <p className="HeThong">Hệ Thống</p>
          <p className="QuanLy">Quản lý Xếp Hàng</p>
        </div>
        <img className="logo_login" src={group} />
      </div>
    </div>
  );
};

export default SignIn;
