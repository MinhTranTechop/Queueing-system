import React, { useState, useEffect } from 'react'
import "./css/DetailEquip.css"
import Navbar from "../Sidebar";
import Topbar from "../Topbar";
import { database } from "../../firebase"
import { useParams } from 'react-router-dom';
import { ref, child, get } from "firebase/database";

interface Equipment {
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
  const { Id_Eq } = useParams<{ Id_Eq: string }>();
  console.log(Id_Eq)
  const [equipment, setEquipment] = useState<any>(null);

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `equipment/${Id_Eq}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
     
        setEquipment(data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [Id_Eq]);

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
          <form key={equipment.Id_Eq}>
            <div className="DetaillEq-group">
              <div className="DetaillEq-name">
                <p>Mã thiết bị:{equipment.Id_Eq}</p>


              </div>

              <div className="DetaillEq-loginin">
                <p>Loại thiết bị:{equipment.Type_Eq}</p>

              </div>
              <div className="DetaillEq-phone">
                <p>Tên thiết bị{equipment.Name_Eq}</p>

              </div>
              <div className="DetaillEq-pass">
                <p>Tên Đăng nhập:{equipment.Username_Eq}</p>

              </div>
              <div className="DetaillEq-email">
                <p>Địa chỉ IP:{equipment.Address_Eq}</p>

              </div>
              <div className="DetaillEq-position">
                <p>Mật khẩu:{equipment.Password_eq}</p>

              </div>
              <div className="DetaillEq-position">
                <p>Dịch vụ sử dụng:{
                    equipment.Service_Eq}</p>

              </div>
            </div>
          </form>
        ) : (
            <p></p>
          )}
        <div>


        </div>

      </div>

    </div>
  )
}

export default DetailEquip
