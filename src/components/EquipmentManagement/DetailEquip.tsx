import React, { useState, useEffect } from "react";
import "./css/DetailEquip.css";
import Navbar from "../Bar/ts/Sidebar";
import Topbar from "../Bar/ts/Topbar";
import { database } from "../../firebase";
import { useParams } from "react-router-dom";
import { ref, child, get } from "firebase/database";

interface Equipment {
  id: string;
  Id_Eq: string;
  Name_Eq: string;
  Type_Eq: string;
  Address_Eq: string;
  Connect_Eq: boolean;
  Action_Eq: boolean;
  Service_Eq: string;
  Username_Eq: string;
  Password_eq: string;
}

const DetailEquip = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [equipment, setEquipment] = useState<any>(null);

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `Equip/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          setEquipment(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="DetaillEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý thiết bị</p>
      </div>
      <div className="DetaillEq-form">
        <div>
          <span className="DetaillEq_info">Thông tin thiết bị</span>
        </div>
        {equipment ? (
          <form key={equipment.Id_Eq} className="DetaillEq_group">
            <div className="DetaillEq-group">
              <div className="DetaillEq-name">
                <p>Mã thiết bị:<span>{equipment.Id_Eq}</span></p>
                
              </div>

              <div className="DetaillEq-loginin">
                <p>Loại thiết bị:<span>{equipment.Type_Eq}</span></p>
                
              </div>
              <div className="DetaillEq-phone">
                <p>Tên thiết bị:  <span>{equipment.Name_Eq}</span></p>
              
              </div>
              <div className="DetaillEq-pass">
                <p>Tên Đăng nhập:<span>{equipment.userName_Eq}</span></p>
                
              </div>
              <div className="DetaillEq-email">
                <p>Địa chỉ IP:<span>{equipment.Address_Eq}</span></p>
                
              </div>
              <div className="DetaillEq-position">
                <p>Mật khẩu: <span>{equipment.Password_Eq}</span></p>
               
              </div>
              <div className="DetaillEq-position">
                <p>Dịch vụ sử dụng:</p>
                <span>{equipment.Service_Eq}</span>
              </div>
            </div>
          </form>
        ) : (
          <p></p>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default DetailEquip;
