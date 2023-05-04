import React from "react";
import Navbar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./css/Profile.css";
import avata from '../assets/avata.png'
import camera from '../assets/camera.png'
import { useParams } from 'react-router-dom';



const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  
  return (
    <div className="profile-main">
      <Navbar />
      <Topbar />
      <div className="profile-form">
        <div className="img">
            <img className="avata-Profile" src={avata}/>
            <span className="name-Profile">Lê Quỳnh Ái Vân </span>
            <img className="camera-Profile" src={camera}/>
        </div>
        <div className="profile-group">
            <div className="profile-name">
                <p>Tên người dùng</p>
                <input className="textProfile" disabled/>
            </div>
            <div className="profile-loginin">
                <p>Tên đăng nhập</p>
                <input className="textProfile" disabled/>
            </div>
            <div className="profile-phone">
                <p>Số điện thoại</p>
                <input className="textProfile" disabled/>
            </div>
            <div className="profile-pass">
                <p>Mật khẩu</p>
                <input className="textProfile"disabled/>
            </div>
            <div className="profile-email">
                <p>Email:</p>
                <input className="textProfile"disabled/>
            </div>
            <div className="profile-position">
                <p>Chức vụ:</p>
                <input className="textProfile"disabled/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
