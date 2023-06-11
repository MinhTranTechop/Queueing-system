import React, { useState , useEffect} from "react";
import "./css/AddEquip.css";
import Navbar from "../Bar/ts/Sidebar";
import Topbar from "../Bar/ts/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../../firebase";
import piDrop from "../EquipmentManagement/assets/fi_chevron-down.png";
import { ref, child, get } from "firebase/database";
import fix from "../../assets/fi_x.png"
interface Service{
  Name_Sv : string;
  Action_Sv:boolean;
}

const AddEquip = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [service, setService] = useState([""]);
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [serviceList , setServiceList] = useState<Service[]>([]);
  useEffect(  () => { 
    
    const  dbRef = ref(database);
   get(child(dbRef, "Service")).then((snapshot) => {
     if (snapshot.exists()) {
       const  data = snapshot.val();
       
       const  userArray  = Object.keys(data).map((key) => {
        return {
          id: key,
          Name_Sv: data[key].Name_Sv,
          Action_Sv: data[key].Action_Sv,
          Review_Sv :data[key].Review_Sv,
             
        };
      });
      setServiceList(userArray);
     }
   });

 }, []);
  const handleAddUser = () => {
    if (
      !name ||
      !type ||
      !address ||
      !id ||
      !userName ||
      !password ||
      !service
    ) {
      setError("Vui lòng nhập dữ liệu đầy đủ");
    } else {
      const userRef = database.ref("Equip");
      const newUserRef = userRef.push();
      newUserRef.set({
        Name_Eq: name,
        Id_Eq: id,
        Address_Eq: address,
        Service_Eq: service,
        Type_Eq: type,
        Connect_Eq: false,
        Action_Eq: false,
        userName_Eq: userName,
        Password_Eq: password,
      });

      setError("");
      setName("");
      setService([]);
      setId("");
      setType("");
      setAddress("");
      navigate("/ListEq");
      // Thực hiện xử lý thêm dữ liệu vào Realtime Database
    }
  };
  const [selectedOption, setSelectedOption] = useState("Chọn loại thiết bị");

  const [open, setOpen] = useState(false);
  const handleOptionClick = (option: string): void => {
    
    setSelectedOption(option);
    setType(option);
    setOpen(false);
  };
  
  const [selectedOptionSv, setSelectedOptionSv] = useState(['']);
  
  const [openSv, setOpenSv] = useState(false);
  
  const handleOptionClickSv = (option: string ): void => {
    
   
    selectedOptionSv.push(option);
    
    
  
   
    setSelectedOptionSv(selectedOptionSv);

    setService(selectedOptionSv)
    setOpenSv(false);
    
  };
  const handleRemoveOption = (optionToRemove: string) : void => {
    setSelectedOptionSv((prevOptions) => prevOptions.filter((option:any) => option !== optionToRemove));
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
        <form>
          <div className="addEq-group">
            <div className="addEq-name">
              <p>Mã thiết bị:</p>
              <input
                className="textaddEq"
                placeholder="Nhập mã thiết bị "
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="addEq-loginin">
              <p>Loại thiết bị:</p>
              <div
                className={`select_menu${open ? " select_menu_open" : ""}`}
                onClick={() => setOpen(!open)}
              >
                <div className="select_btnUser">
                  <span className="drop_select">{selectedOption}</span>
                  <img className="icon-wrap" src={piDrop} />
                </div>
                <ul className="ListEqType">
                  <li
                    className="option"
                    onClick={() => handleOptionClick("Kiosk")}
                  >
                    <span className="option_text">Kiosk</span>
                  </li>
                  <li
                    className="option"
                    onClick={() => handleOptionClick("Display counter")}
                  >
                    <span className="option_text">Display counter</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="addEq-phone">
              <p>Tên thiết bị:</p>
              <input
                className="textaddEq"
                placeholder="Nhập tên thiết bị "
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="addEq-pass">
              <p>Tên Đăng nhập:</p>
              <input
                className="textaddEq"
                placeholder="Nhập tên đăng nhập "
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="addEq-email">
              <p>Địa chỉ IP:</p>
              <input
                className="textaddEq"
                placeholder="Nhập địa chỉ IP "
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="addEq-position">
              <p>Mật khẩu:</p>
              <input
                className="textaddEq"
                placeholder="Nhập mật khẩu "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="addEq-position">
              <p>Dịch vụ sử dụng:</p>
              <div className={`select_menu${openSv ? " select_menu_open" : ""}`} onClick={() => setOpenSv(!openSv)}>
                  <div className="select_btnSv_Eq" >
                    <div className="DropdownSv_Eq">
                      {(selectedOptionSv).slice(1).map((alo:any) =>(
                       <span className="drop_select1" >{alo} <img src={fix} alt="" onClick={()=>handleRemoveOption(alo)}/></span>
                    ))}
                   
                   </div>
                   <img className="icon-wrap" src={piDrop} />
                  </div>
                  
                  <ul className="listSv_Eq">
                   
                   { serviceList.map((item)=>(
                      item.Action_Sv === true ?
                      <li  className="option"  onClick={() => handleOptionClickSv(item.Name_Sv)}>
                        <span className="option_text">{item.Name_Sv}</span>
                      </li>
                      :<></>
                     
                ))}
                   
                  </ul>
                </div>
            </div>
          </div>
        </form>
        <div>
          {error ? (
            <p className="addEq_warning" style={{ color: "red" }}>
              {error}
            </p>
          ) : (
            <p className="addEq_warning">Là trường thông tin bắt buộc</p>
          )}
        </div>
      </div>
      <div className="addEq_btn">
        <Link to="/ListEq" className="linh-nav">
          <button className="addEq_No">Hủy bỏ</button>
        </Link>
        <button className="addEq_Add" type="submit" onClick={handleAddUser}>
          Thêm thiết bị
        </button>
      </div>
    </div>
  );
};

export default AddEquip;
