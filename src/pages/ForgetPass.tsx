import React from "react";
import "./css/ForgetPass.css";
import logoAlta from "../assets/logo.png";
import Frame from "../assets/Frame.png";
import { Link } from "react-router-dom";
const ForgetPass: React.FC = () => {
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
            <input className="emailtext" type="text" />
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
            <Link className="link-nav" to="/Changepass">
              {" "}
              <button className="btnTT" type="submit">
                Tiếp tục
              </button>
            </Link>
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
