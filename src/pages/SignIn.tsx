import React , {useState} from "react";
import logoAlta from "../assets/logo.png";
import "./css/SignIn.css";
import group from "../assets/Group341.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const SignIn : React.FC = () => {
  const [password, setPassword] = useState("");
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
            <input className="usertext" type="text" />
          </label>
          <label className="label_pass">
            <p>Mật khẩu *</p>
            <input className="passtext" type={inputType}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className='eyes'>
          <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={toggleShowPassword}
      />
      </div>
          <div>
            <Link to="/ForgetPass">
              <label className="forgetPass">
                <span>Quên mật khẩu?</span>
              </label>
            </Link>
          </div>
        </form>
        <div>
          <Link className="link-nav" to='/profile'><button className="btnDN" type="submit">
            Đăng nhập
          </button></Link>
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
