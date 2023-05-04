import React , {useState} from "react";
import "./css/ForgetPass.css";
import logoAlta from "../assets/logo.png";
import Frame from "../assets/Frame.png";
import { Link ,useNavigate } from "react-router-dom";
import  {database  }  from "../firebase";
interface User {
  userName: string;
  email: string;
}

const ForgetPass: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const userRef = database.ref("users").orderByChild("email").equalTo(email);
      const snapshot = await userRef.once("value");
      const userData = snapshot.val();
      if (!userData) {
        
        setError("không tồn tại email");
        console.log(userData)
        return;
      }
      
       const userId = Object.keys(userData)[0];
     const user = userData[userId] as User;
      if (user.email.toString() !== email) {
        console.log(user)
        setError("không tồn tại email ");
        
        return;
      }
      // Login successful
      navigate(`/Changepass/${userId}`);
  

      
      
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };
  return (
    <div className="wrapper">
      <div className="forget_wrapper">
        <div>
          <img className="logologin" src={logoAlta} />
        </div>
        <form className="forget-form">
          <label className="label_forget">
            <h3 className="passname">Đặt lại mật khẩu</h3>
            <p>Vui lòng nhập email để đặt lại mật khẩu của bạn *</p>
            <input className="emailtext" type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>

          <div></div>
        </form>
        <div>
          <div className="btnForget">
            <Link className="link-nav" to="/login">
              {" "}
              <button className="btnHuy" type="submit">
                Hủy
              </button>
            </Link>

              {" "}
              <button className="btnTT" type="submit" onClick={handleLogin}>
                Tiếp tục
              </button>
           {error }
          </div>
        </div>
      </div>
      <div className="pritureForget">
        <img className="logoForget" src={Frame} />
      </div>
    </div>
  );
};

export default ForgetPass;
