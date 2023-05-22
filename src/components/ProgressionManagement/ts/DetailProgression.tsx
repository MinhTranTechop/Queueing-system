import React ,{useEffect,useState}from 'react'
import Navbar from "../../Bar/ts/Sidebar";
import Topbar from "../../Bar/ts/Topbar";
import { database } from "../../../firebase";
import { useParams } from "react-router-dom";
import wait from "../assets/Blue.png"
import used from "../assets/Grey.png"
import disconnect from '../../EquipmentManagement/assets/Ellipse_1.png';
import { ref, child, get } from "firebase/database";

const DetailProgression = () => {
  const { id } = useParams<{ id: string }>();
  const userId = localStorage.getItem('id');
  const [equipment, setEquipment] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `Progression/${id}`))
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
    <div className="DetaillEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý cấp số</p>
      </div>
      <div className="DetaillEq-form">
        <div>
          <span className="DetaillEq_info">Thông tin cấp số</span>
        </div>
       
          <form  className="DetaillEq_group">
          {equipment? 
            <div className="DetaillEq-group">
              <div className="DetaillEq-name">
                <p>Họ tên:<span>{equipment.NameUsers_Pr}</span></p>
                
              </div>

              <div className="DetaillEq-loginin">
                <p>Nguồn cấp:<span>{equipment.Produce_Pr}</span></p>
                
              </div>
              <div className="DetaillEq-phone">
                <p>Tên dịch vụ:  <span>{equipment.NameSv_Pr}</span></p>
              
              </div>
              <div className="DetaillEq-pass">
                <p>Trạng thái:{equipment.Status_Pr === "wait" ? <div><img className="imgList" src={wait} alt="" /><span>Đang chờ</span></div> :
                  equipment.Status_Pr === "use" ?
                 <div><img className="imgList" src={used} alt="" /><span>Đã sử dụng</span></div> : <div><img className="imgList" src={disconnect} alt="" /><span>Bỏ qua</span></div>}</p>
                
              </div>
              <div className="DetaillEq-email">
                <p>Số thứ tự:<span>{equipment.Id_Pr}</span></p>
                
              </div>
             
             
              {users ?
              <div>
              <div className="DetaillEq-position">
                <p>Số điện thoại: <span>{users.Phone_User}</span></p>
               
            </div>
        <div className="DetaillEq-position">
              <p>Địa chỉ Email:</p>
              <span>{users.email}</span> 
              </div>
              </div>
              :
              <p></p>
              }
              <div className="DetaillEq-position">
                <p>Hạn sử dụng:</p>
                <span>{equipment.DateEnd_Pr}</span>
              </div>
             
              </div>
            
                   :
                   <p></p>
         }
         
         
          </form>
   
        <div></div>
      </div>
    </div>
  )
}

export default DetailProgression
