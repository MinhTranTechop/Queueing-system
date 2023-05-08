import React ,{useState, useEffect}from "react";
import { Link ,useNavigate } from "react-router-dom";
import "./css/ListEquip.css";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import btnadd from "./assets/add-square.png";
import piSearch from "./assets/fi_search.png";
import piDrop from "./assets/fi_chevron-down.png";
import connect from './assets/Ellipse2.png'
import disconnect from './assets/Ellipse_1.png'
import { database } from "../../firebase";
import { ref, child, get } from "firebase/database";

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
const ITEMS_PER_PAGE = 5;
const dbRef = ref(database);
get(child(dbRef, `Equip`)).then((snapshot) => {
  if (snapshot.exists()) {

    const data = (snapshot.val()) ;
    console.log(data);
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
const ListEquip = () => {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
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
  const handleLogin = async () => {
    
      const userRef =  database.ref("Equip");
      const snapshot = await userRef.once("value");
      const userData = snapshot.val();
    
      
       const EquipID = Object.keys(userData)[0];
     
       navigate(`/DetallEq/${EquipID}`);
        
       
        
      
      // Login successful
     

      
      
 
  };
 
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = equipment.filter((Equipment) => {
    return Equipment.Name_Eq.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const [selectedOption, setSelectedOption] = useState("Tất cả");
  
  const [open, setOpen] = useState(false);

  const handleOptionClick = (option: string): void => {
    setSelectedOption(option);
    setOpen(false);
  };
  const [selectedOption1, setSelectedOption1] = useState("Tất cả");
  const [open1, setOpen1] = useState(false);

  const handleOptionClick1 = (option1: string): void => {
    setSelectedOption1(option1);
    setOpen1(false);
  };
  
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
                <div className={`select_menu${open ? " select_menu_open" : ""}`} onClick={() => setOpen(!open)}>
                  <div className="select_btn" >
                    <span className="drop_select" >{selectedOption}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="list">
                    <li className="option"  onClick={() => handleOptionClick("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    <li className="option" onClick={() => handleOptionClick("Hoạt động")}>
                      <span className="option_text" >Hoạt động</span>
                    </li>
                    <li className="option"onClick={() => handleOptionClick("Ngưng hoạt động")}>
                      <span className="option_text" >Ngưng hoạt động</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Connect_status">
                <p>Trạng thái kết nối</p>
                <div className={`select_menu2${open1 ? " select_menu_open2" : ""}`} onClick={() => setOpen1(!open1)}>
                  <div className="select_btn" >
                    <span className="drop_select" >{selectedOption1}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="list">
                    <li className="option"  onClick={() => handleOptionClick1("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    <li className="option" onClick={() => handleOptionClick1("Kết nối ")}>
                      <span className="option_text" >Kết nối</span>
                    </li>
                    <li className="option"onClick={() => handleOptionClick1("Mất kết nối")}>
                      <span className="option_text" >Mất kết nối</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="Search_Eq">
              <p>Từ khóa</p>
              <div className="Search_btn" onChange={handleSearch}>
                <span> Nhập từ khóa</span>
                <img src={piSearch} />
              </div>
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
                <th style={{ width: "145px" }}>Trạng thái kết nối</th>
                <th style={{ width: "268px" }}>Dịch vụ sử dụng</th>
                <th style={{ width: "82px" }}> </th>
                <th className="thEuqEnd" style={{ width: "106px" }}>
                  {" "}
                </th>
              </tr>
              
              {equipment.map((eq,index)  => (
              <tr key={eq.Id_Eq} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                <td>{eq.Id_Eq}</td>
                <td>{eq.Name_Eq}</td>
                <td>{eq.Address_Eq}</td>
                <td>{eq.Action_Eq ? <div><img className="imgList" src={connect} alt="" /><span>Hoạt động</span></div>  : <div><img className="imgList" src={disconnect} alt="" /><span>Ngưng hoạt động</span></div>}</td>
                <td>{eq.Connect_Eq ?<div><img className="imgList" src={connect} alt="" /><span>Kết nối</span></div>  : <div><img className="imgList" src={disconnect} alt="" /><span>Mất kết nối</span></div>}</td>
                <td>{eq.Service_Eq}</td>
                <td onClick={handleLogin}>
                  Chi tiết
                </td>
                <td>
                  <Link to="/UpdateEq">Cập nhập</Link>
                </td>
              </tr>
              ))}
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
