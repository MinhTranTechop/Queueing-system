import React ,{useState,useEffect} from "react";
import Navbar from "../components/Bar/ts/Sidebar";
import Topbar from "../components/Bar/ts/Topbar";
import "./css/Profile.css";
import avata from '../assets/avata.png'
import camera from '../assets/camera.png'
import { useParams } from 'react-router-dom';
import {database } from "../firebase";
import { ref, child, get } from "firebase/database";
interface User {
  Name_User:string;
  Phone_User:number;
  Position_User:string;
  userName: string;
  password: string;
}

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [users, setUsers] = useState<any>();
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          setUsers(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);
  return (
    <div className="profile-main">
      <Navbar />
      <Topbar />
      {users ? (
      <div className="profile-form">
        <div className="img">
            <img className="avata-Profile" src={avata}/>
            <span className="name-Profile">{users.Name_User}</span>
            <img className="camera-Profile" src={camera}/>
        </div>
       
        <div className="profile-group" key={users.userId}>
            <div className="profile-name">
                <p>Tên người dùng</p>
                <input className="textProfile" value={users.Name_User} disabled/>
            </div>
            <div className="profile-loginin">
                <p>Tên đăng nhập</p>
                <input className="textProfile" value={users.userName}  disabled/>
            </div>
            <div className="profile-phone">
                <p>Số điện thoại</p>
                <input className="textProfile" value={users.Phone_User} disabled/>
            </div>
            <div className="profile-pass">
                <p>Mật khẩu</p>
                <input className="textProfile"value={users.password} disabled/>
            </div>
            <div className="profile-email">
                <p>Email:</p>
                <input className="textProfile" value={users.email} disabled/>
            </div>
            <div className="profile-position">
                <p>Chức vụ:</p>
                <input className="textProfile"value={users.Position_User} disabled/>
            </div>
        </div>
       
      </div>
         ) : (
          <p></p>
        )}
    </div>
    
  );
};

export default Profile;
