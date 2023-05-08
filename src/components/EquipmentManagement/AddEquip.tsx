import React , {useState}from "react";
import "./css/AddEquip.css";
import Navbar from "../Sidebar";
import Topbar from "../Topbar";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../../firebase";
import { ref, child, get } from "firebase/database";

const AddEquip = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  
  const [error, setError] = useState('');
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleAddUser  = () => {
    if (!name || !type ||!address ||!id ||!userName ||!password ||!service  ) {
      setError("Vui lòng nhập dữ liệu đầy đủ");
    } else {
    const userRef = database.ref('Equip');
    const newUserRef = userRef.push();
    newUserRef.set({
      Name_Eq: name,
      Id_Eq: id,
      Address_Eq:address,
      Service_Eq:service,
      Type_Eq:type,
      Connect_Eq:false,
      Action_Eq:false,
      userName_Eq:userName,
      Password_Eq:password
    });
    
   
  
    setError("");
    setName('');
    setService('');
    setId('');
    setType('');
    setAddress('');
   navigate("/ListEq");
    // Thực hiện xử lý thêm dữ liệu vào Realtime Database
  }
  };

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
        <button className="addEq_Add" type="submit" onClick={handleAddUser}>Thêm thiết bị</button>
      </div>
    </div>
  );
};

export default AddEquip;
