import React,{useState , useEffect} from 'react'
import "./css/DetailEquip.css"
import Navbar from "../Sidebar";
import Topbar from "../Topbar"; 
import {database} from "../../firebase"
import { useParams } from 'react-router-dom';

interface Equipment {
  Id_Eq: string;
  Name_Eq: string;
  Type_Eq :string;
  Address_Eq: string;
  Connect_Eq:boolean;
  Action_Eq:boolean;
  Service_Eq:string;
  Username_Eq:string;
  Password_eq:string;
}
const DetailEquip = () => {
  const { Id_Eq } = useParams<{ Id_Eq: string }>();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  useEffect(() => {
    
    const ref = database.ref("Equip");

    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      const equipmentList = [];

      for (let id in data) {
        equipmentList.push({
          id,
          ...data[id],
        });
      }

      setEquipment(equipmentList);
    });

    return () => ref.off();
  }, []);
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
        {equipment.map((eq)  => (
        <form key={eq.Id_Eq}> 
        <div className="DetaillEq-group">
          <div className="DetaillEq-name">
            <p>Mã thiết bị:{eq.Id_Eq}</p>
            
            
          </div>

          <div className="DetaillEq-loginin">
            <p>Loại thiết bị:{eq.Type_Eq}</p>
            
          </div>
          <div className="DetaillEq-phone">
            <p>Tên thiết bị{eq.Name_Eq}</p>
          
          </div>
          <div className="DetaillEq-pass">
            <p>Tên Đăng nhập:{eq.Username_Eq}</p>
           
          </div>
          <div className="DetaillEq-email">
            <p>Địa chỉ IP:{eq.Address_Eq}</p>
            
          </div>
          <div className="DetaillEq-position">
            <p>Mật khẩu:{eq.Password_eq}</p>
            
          </div>
          <div className="DetaillEq-position">
            <p>Dịch vụ sử dụng:{eq.Service_Eq}</p>
           
          </div>
        </div>
        </form>
        ))}
        <div>
         
    
        </div>
      
      </div>
      
    </div>
  )
}

export default DetailEquip
