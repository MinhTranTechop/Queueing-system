import React , {useState,useEffect}from "react";
import "./css/AddEquip.css";
import Navbar from "../Sidebar";
import Topbar from "../Topbar";
import { Link, useNavigate ,useParams } from "react-router-dom";
import { database } from "../../firebase";
import { ref, child, get ,update } from "firebase/database";

const AddEquip = () => {
  const navigate = useNavigate();
  const { Id_Eq } = useParams<{ Id_Eq: string }>();
 
  const handleUpdate =  () => {
   
    update(ref(database,`Equip/${Id_Eq}`),{
        Id_Eq:id,
        Name_eq:name,
        Type_Eq :type,
        Address_Eq: address,
        Service_Eq:service,
        Username_Eq:userName,
        Password_eq:password

      
    });
    navigate('/ListEq')
  };

  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  
  const [error, setError] = useState('');
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // useEffect(() => {
    
  //   const ref = database.ref("Equip/");
  //   // let EquipID = ref.push().key;
  //   ref.on("value", (snapshot) => {
  //     let id ;
  //     const data = snapshot.val();
  //     const equipmentList = [];
      
  //     for ( id in data) {
  //       const eq = data[id];
  //       equipmentList.push({
  //         id,
  //         ...data[id],
         
  //       });
  //     }
  //     const equipmentItem = Object.values(data)[0]
  //     // console.log(equipmentItem);
  //     setEquipment(equipmentList);
  //   });

  //   return () => ref.off();
  // }, []);
  

  return (
    <div className="AddEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý thiết bị</p>
      </div>
      <div className="addEq-form">
        <div>
          <span className="addEq_info">Thông tin thiết bị</span>
        </div>
        <form > 
        <div className="addEq-group">
          <div className="addEq-name">
            <p>Mã thiết bị:</p>
            <input className="textaddEq" placeholder="Nhập mã thiết bị " onChange={(e) => setId(e.target.value)}  />
            
          </div>

          <div className="addEq-loginin">
            <p>Loại thiết bị:</p>
            <input className="textaddEq" placeholder="Nhập loại thiết bị " onChange={(e)=>setType(e.target.value)} />
          </div>
          <div className="addEq-phone">
            <p>Tên thiết bị:</p>
            <input className="textaddEq" placeholder="Nhập tên thiết bị " onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="addEq-pass">
            <p>Tên Đăng nhập:</p>
            <input className="textaddEq" placeholder="Nhập tên đăng nhập "onChange={(e)=> setUserName(e.target.value)}  />
          </div>
          <div className="addEq-email">
            <p>Địa chỉ IP:</p>
            <input className="textaddEq" placeholder="Nhập địa chỉ IP " onChange={(e)=> setAddress(e.target.value)} />
          </div>
          <div className="addEq-position">
            <p>Mật khẩu:</p>
            <input className="textaddEq" placeholder="Nhập mật khẩu " onChange={(e)=> setPassword(e.target.value)} />
          </div>
          <div className="addEq-position">
            <p>Dịch vụ sử dụng:</p>
            <input
              className="textaddEqSv"
              placeholder="Nhập dịch vụ sử dụng "
              onChange={(e)=>setService(e.target.value)}
            />
          </div>
        </div>
        </form>
        <div>
         
        {error ?  <p className="addEq_warning" style={{ color: "red" }}>{error}</p> :<p className="addEq_warning">Là trường thông tin bắt buộc</p>}
        </div>
      
      </div>
      <div className="addEq_btn">
        <Link to='/ListEq' className="linh-nav"><button className="addEq_No">Hủy bỏ</button></Link>
        <button className="addEq_Add" type="submit" onClick={handleUpdate}>Cập nhật</button>
      </div>
    </div>
  );
};

export default AddEquip;
