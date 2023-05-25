import React ,{useState, useEffect}from "react";
import { Link ,useNavigate } from "react-router-dom";
import "../../css/Users/ListUsers.css";
import Topbar from "../../../Bar/ts/Topbar";
import Sidebar from "../../../Bar/ts/Sidebar";
import btnadd from "../../../EquipmentManagement/assets/add-square.png";
import piSearch from "../../../EquipmentManagement/assets/fi_search.png";
import piDrop from "../../../EquipmentManagement/assets/fi_chevron-down.png";
import connect from '../../../EquipmentManagement/assets/Ellipse2.png'
import disconnect from '../../../EquipmentManagement/assets/Ellipse_1.png'
import { database } from "../../../../firebase";
import { ref, child, get } from "firebase/database";

import Paging from "../../../Bar/ts/Paging"



interface User {
  userId :string;
  Name_User:string;
  Phone_User:number;
  Position_User:string;
  userName: string;
  password: string;
  email: string;
  Action_User:string
}

interface Position{
  Name_Po:string;
}

const ListUsers = () => {
  const navigate = useNavigate();
  const [filterConnect, setFilterConnect] = useState<User[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState(false);
  const [equipment, setEquipment] = useState<User[]>([]);
  const [positionList , setPositionList] = useState<Position[]>([]);

  function handleUpdatesClick(eq:User) {
    navigate(`/UpdateUsers/${eq.userId}`, { state: { equipmentData: eq }, replace: true });
  }
  useEffect(  () => { 
    
     const  dbRef = ref(database);
    get(child(dbRef, "users")).then((snapshot) => {
      if (snapshot.exists()) {
        const  data = snapshot.val();
        const  userArray  = Object.keys(data).map((key) => {
          return {
            userId: key,
            Name_User:data[key].Name_User,
            Phone_User:data[key].Phone_User,
            Position_User:data[key].Position_User,
            userName: data[key].userName,
            password: data[key].password,
            email: data[key].email,
            Action_User:data[key].Action_User
          };
        });
        setEquipment(userArray);
      }
    });

  }, []);
  useEffect(  () => { 
    
    const  dbRef = ref(database);
   get(child(dbRef, "Position")).then((snapshot) => {
     if (snapshot.exists()) {
       const  data = snapshot.val();
       
       const  userArray  = Object.keys(data).map((key) => {
        return {
          id: key,
          Name_Po: data[key].Name_Po,
          Count_Users: data[key].Count_Users,
          Review_Po :data[key].Review_Po,
             
        };
      });
      setPositionList(userArray);
     }
   });

 }, []);
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
   
   setFilteredEquipment(true);   
    const query: string = event.target.value.toLowerCase();
    const filteredEquipments: User[] =equipment.filter((eq: User) => {
      const name: string = eq.userName.toLowerCase();
      const address: string = eq.Name_User.toLowerCase();
      const service: string = eq.Phone_User.toString().toLowerCase();
      const id :string = eq.email.toLowerCase();
      const Position :string = eq.Position_User.toLowerCase();
     

    
      return name.includes(query) || address.includes(query) || service.includes(query)|| id.includes(query)|| Position.includes(query);
      
    

    });
   
    setFilterConnect(filteredEquipments);
    
    
  };


  const [selectedOption, setSelectedOption] = useState("Tất cả");
  
  const [open, setOpen] = useState(false);

  const handleOptionClick = (option: string ): void => {
    setFilteredEquipment(true);
    setSelectedOption(option);
    setOpen(false);
    const filterConnect: User[] = equipment.filter((eq: User) => {
      if (option === "Tất cả") {
        return true;
      }else if (option === eq.Position_User  ) {
         
        
        return true;
        
      }
      return false;
    });
  
    setFilterConnect(filterConnect);
  };
  
  
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="ListEq_form">
        <div>
          <p className="List_name">Dach sách tài khoản</p>
        </div>
        <div className="Table_Status">
          <div className="List_status">
            <div className="Status_full">
              <div className="Action_status">
                <p>Tên vai trò</p>
                <div className={`select_menu${open ? " select_menu_open" : ""}`} onClick={() => setOpen(!open)}>
                  <div className="select_btn" >
                    <span className="drop_select" >{selectedOption}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="list">
                    <li className="option"  onClick={() => handleOptionClick("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    {positionList.map((item)=>(
                      
                      <li  className="option"  onClick={() => handleOptionClick(item.Name_Po)}>
                        <span className="option_text">{item.Name_Po}</span>
                      </li>
                ))}
                  </ul>
                </div>
              </div>
              
            </div>
            <div className="Search_Eq">
              <p>Từ khóa</p>
              <div className="Search_btn" >
                <input placeholder="Nhập từ khóa" onChange={handleSearch} />
                <img src={piSearch} />
              </div>
            </div>
          </div>

          <div className="Table_Euq">
            <table>
              <tr>
               
                <th className="thEuq" style={{ width: "150px" }}>Tên đăng nhập</th>
                <th style={{ width: "170px" }}>Họ tên</th>
                <th style={{ width: "130px" }}>Số điện thoại</th>
                <th style={{ width: "255px" }}>Email</th>
                <th style={{ width: "114px" }}>Vai trò</th>
                <th  style={{ width: "193px" }}>
                 Trạng thái hoạt động
                </th>
                <th className="thEuqEnd" style={{ width: "102px" }}>
                  {" "}
                </th>
              </tr>
               
              {/* {filteredEquipment.length > 0 ? 
               filteredEquipment.map((eq ,index) => (
              <tr key={eq.Id_Eq} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                <td>{eq.Id_Eq} </td>
                <td>{eq.Name_Eq}</td>
                <td>{eq.Address_Eq}</td>
                <td>{eq.Action_Eq ? <div><img className="imgList" src={connect} alt="" /><span>Hoạt động</span></div>  : <div><img className="imgList" src={disconnect} alt="" /><span>Ngưng hoạt động</span></div>}</td>
                <td>{eq.Connect_Eq ?<div><img className="imgList" src={connect} alt="" /><span>Kết nối</span></div>  : <div><img className="imgList" src={disconnect} alt="" /><span>Mất kết nối</span></div>}</td>
                <td>{eq.Service_Eq}</td>
                <td className="Detail_ListEq"onClick={() => handleDetailsClick(eq)} >
                    Chi tiết
                </td>
                <td>
                  <Link to={`/UpdateEq`}>Cập nhật</Link>
                </td>
              </tr>
              )): */}
              { filteredEquipment ? 
                
                filterConnect.map((eq, index) => (
                <tr key={eq.userId} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                <td>{eq.userName} </td>
                <td>{eq.Name_User}</td>
                <td>{eq.Phone_User}</td>
                <td>{eq.email}</td>
                <td>{eq.Position_User}</td>
                <td>{eq.Action_User ? <div><img className="imgList" src={connect} alt="" /><span>Hoạt động</span></div>  : <div><img className="imgList" src={disconnect} alt="" /><span>Ngưng hoạt động</span></div>}</td>
               
                
              
                <td className="Detail_ListEq"onClick={() => handleUpdatesClick(eq)} >
                  Cập nhật
                </td>
              </tr>
              ))
                :
              
                equipment.map((eq, index) => (
                  <tr key={eq.userId} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                  <td>{eq.userName} </td>
                  <td>{eq.Name_User}</td>
                  <td>{eq.Phone_User}</td>
                  <td>{eq.email}</td>
                  <td>{eq.Position_User}</td>
                  <td>{eq.Action_User === "Hoạt động" ? <div><img className="imgList" src={connect} alt="" /><span>Hoạt động</span></div>  : <div><img className="imgList" src={disconnect} alt="" /><span>Ngưng hoạt động</span></div>}</td>
                 
                  
                
                  <td className="Detail_ListEq"onClick={() => handleUpdatesClick(eq)} >
                    Cập nhật
                  </td>
                </tr>
              ))
            }
            <Paging itemsPerPage={5} totalItems={equipment.length} />
            </table>
          </div>
        </div>
        <Link className="link-nav" to="/AddUsers">
          <div className="btnAddEuq" >
            <img src={btnadd} />
            <p>Thêm tài khoản</p>
          </div>
        </Link> 
        
      </div>
      
    </div>
  );
};

export default ListUsers;
