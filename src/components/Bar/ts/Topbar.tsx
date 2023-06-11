import React from "react";
import "../css/Topbar.css";
import avata from "../../../assets/avata.png";
import Notify from "./Notify";
import Profile from "../../../pages/Profile";
import { useParams, useLocation, Link } from "react-router-dom";
const Topbar: React.FC = () => {
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("Name_User");
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  // const content =  location.pathname === '/ListEq' ?'Thiết bị' :location.pathname === '/ListSv' ? 'Dịch vụ':location.pathname === '/ListPr' ?  'Cấp số' : location.pathname === '/ListRp' ? 'Báo cáo' : ' Cài đặt hệ thống';
  return (
    <div className="topbar">
      <div className="topbar-left">
        {location.pathname === "/Dashboard" ? (
          <button className="functionP">Dashboard</button>
        ) : location.pathname === "/ListEq" ? (
          <p className="Topbar_Name">
            Thiết bị {` > `} <span> Danh sách thiết bị </span>
          </p>
        ) : location.pathname === "/ListSv" ? (
          <p className="Topbar_Name">
            Dịch vụ {` > `} <span> Danh sách dịch vụ </span>
          </p>
        ) : location.pathname === "/ListPr" ? (
          <p className="Topbar_Name">
            Cấp số {` > `} <span> Danh sách cấp số </span>
          </p>
        ) : location.pathname === "/ListRp" ? (
          <p className="Topbar_Name">
            Báo cáo {` > `} <span> Lập báo cáo </span>
          </p>
        ) : location.pathname === "/ListPo" ? (
          <p className="Topbar_Name">
            Cài đặt hệ thống {` > `} <span> Quản lý vai trò </span>
          </p>
        ) : location.pathname === "/ListUsers" ? (
          <p className="Topbar_Name">
            Cài đặt hệ thống {` > `} <span> Quản lý tài khoản </span>
          </p>
        ) : location.pathname === "/NotifyUsers" ? (
          <p className="Topbar_Name">
            Cài đặt hệ thống {` > `} <span> Nhật ký hoạt động </span>
          </p>
        ) : location.pathname === "/AddEq" ? (
          <p className="Topbar_Name">
            Thiết bị {` > `}
            <h1> Danh sách thiết bị{` > `} </h1> <span> Thêm thiết bị </span>
          </p>
        ) : location.pathname === `/DetallEq/${id}` ? (
          <p className="Topbar_Name">
            Thiết bị {` > `}
            <h1> Danh sách thiết bị{` > `} </h1>{" "}
            <span> Chi tiết thiết bị </span>
          </p>
        ) : location.pathname === `/UpdateEq/${id}` ? (
          <p className="Topbar_Name">
            Thiết bị {` > `}
            <h1> Danh sách thiết bị{` > `} </h1>{" "}
            <span> Cập nhật thiết bị </span>
          </p>
        ) : location.pathname === "/AddSv" ? (
          <p className="Topbar_Name">
            Dịch vụ {` > `}
            <h1> Danh sách dịch vụ{` > `} </h1> <span> Thêm dịch vụ </span>
          </p>
        ) : location.pathname === `/DetailSv/${id}` ? (
          <p className="Topbar_Name">
            Dịch vụ {` > `}
            <h1> Danh sách dịch vụ{` > `} </h1> <span> Chi tiết dịch vụ </span>
          </p>
        ) : location.pathname === `/UpdateSv/${id}` ? (
          <p className="Topbar_Name">
            Dịch vụ {` > `}
            <h1> Danh sách dịch vụ{` > `} </h1> <span> Cập nhật dịch vụ </span>
          </p>
        ) : location.pathname === "/AddPr" ? (
          <p className="Topbar_Name">
            Cấp số {` > `}
            <h1> Danh sách cấp số{` > `} </h1> <span> Cấp số mới </span>
          </p>
        ) : location.pathname === `/DetailPr/${id}` ? (
          <p className="Topbar_Name">
            Cấp số {` > `}
            <h1> Danh sách cấp số{` > `} </h1> <span> Chi tiết </span>
          </p>
        ) : location.pathname === "/AddPo" ? (
          <p className="Topbar_Name">
            Cài đặt hệ thống {` > `}
            <h1> Quản lý vai trò{` > `} </h1> <span> Thêm vai trò </span>
          </p>
        ) : location.pathname === `/UpdatePo/${id}` ? (
          <p className="Topbar_Name">
            Cài đặt hệ thống {` > `}
            <h1> Quản lý vai trò{` > `} </h1> <span> Cập nhật vai trò </span>
          </p>
        ) : location.pathname === "/AddUsers" ? (
          <p className="Topbar_Name">
            Cài đặt hệ thống {` > `}
            <h1> Quản lý tài khoản{` > `} </h1> <span> Thêm tài khoản </span>
          </p>
        ) : location.pathname === `/UpdateUsers/${id}` ? (
          <p className="Topbar_Name">
            Cài đặt hệ thống {` > `}
            <h1> Quản lý tài khoản{` > `} </h1>{" "}
            <span> Cập nhật tài khoản </span>
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="topbar-right">
        <div className="notify">
          <Notify />
        </div>
        <div className="profile">
          <div className="imageP">
            <Link to={`/profile/${userId}`}>
              {" "}
              <img src={avata} />
            </Link>
          </div>
          <div className="nameP">
            <p className="xinchao">Xin chào</p>
            <span className="nameMain">{userName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
