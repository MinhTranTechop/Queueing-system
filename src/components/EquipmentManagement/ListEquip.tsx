import React from "react";
import { Link } from "react-router-dom";
import "./css/ListEquip.css";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import btnadd from "./assets/add-square.png";
const ListEquip = () => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="ListEq_form">
        <div>
          <p className="List_name">Dach sách thiết bị</p>
        </div>
        <div className="Table_Status">
          <div className="List_status">
            <div className="Status_full">
              <div className="Action_status">
                <p>Trạng thái hoạt động</p>
                <input type="select" />
              </div>
              <div className="Connect_status">
                <p>Trạng thái kết nối</p>
                <input type="select" />
              </div>
            </div>
            <div className="Search_Eq">
              <p>Từ khóa</p>
              <input type="text" />
            </div>
          </div>

          <div className="Table_Euq">
            <table>
              <tr>
                <th className="thEuq" style={{ width: "103px" }}>
                  Mã thiết bị
                </th>
                <th style={{ width: "99px" }}>Tên thiết bị</th>
                <th style={{ width: "138px" }}>Địa chỉ IP</th>
                <th style={{ width: "171px" }}>Trạng thái hoạt động</th>
                <th style={{ width: "145px" }}>Trạng thái kết thúc</th>
                <th style={{ width: "268px" }}>Dịch vụ sử dụng</th>
                <th style={{ width: "82px" }}> </th>
                <th className="thEuqEnd" style={{ width: "106px" }}>
                  {" "}
                </th>
              </tr>
              <tr>
                <td>KIO_01</td>
                <td>Kiosk</td>
                <td>127.168.1.10</td>
                <td>Ngưng hoạt động</td>
                <td>Kết nối</td>
                <td>Khám tinh mạnh</td>
                <td>
                  <Link to="/DetallEq">Chi tiết</Link>
                </td>
                <td>
                  <Link to="/UpdateEq">Cập nhập</Link>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <Link className="link-nav" to="/AddEq">
          <div className="btnAddEuq">
            <img src={btnadd} />
            <p>Thêm thiết bị</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ListEquip;
