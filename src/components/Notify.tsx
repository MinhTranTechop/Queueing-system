import React , {useState} from "react";
import './css/Notify.css'
import iconNotify from "../assets/iconNotify.png"
const Notify = () => {
  const [isActive, setIsActive] = useState(false);
  
  const toggleDropdown = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="notify_form" onClick={toggleDropdown}>
      <img src={iconNotify}/>
      <div className={`notify-dropdown${isActive ? " show" : ""}`}>
        <ul>
          <li className="notify_li" >
            <p className="dropdown_notify">Thông báo</p>
          </li>
          <li >
            <p className="dropdown-item1">Người dùng :</p>
            <p className="dropdown-item2">Thời gian nhận số :</p>
            <div className="line"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notify;
