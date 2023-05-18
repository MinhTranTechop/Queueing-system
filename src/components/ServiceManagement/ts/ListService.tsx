import React ,{useEffect , useState} from 'react';
import { Link ,useNavigate } from "react-router-dom";
import { database } from "../../../firebase";
import Topbar from "../../Bar/ts/Topbar";
import Sidebar from "../../Bar/ts/Sidebar";
import { ref, child, get } from "firebase/database";
import btnadd from "../assets/add-square.png";
import piSearch from "../assets/fi_search.png";
import piDrop from "../assets/fi_chevron-down.png";
import connect from '../assets/Ellipse2.png'
import disconnect from '../assets/Ellipse_1.png'
import date from '../assets/Vector.png'
import '../css/ListService.css'
interface Service {
    id:string;
    Id_Sv: string;
    Name_Sv: string;
    Review_Sv: string;
    Action_Sv:boolean;
    Date_Sv: string
    
  }

const ListService = () => {
    const navigate = useNavigate();
    const [service, setService] = useState<Service[]>([]);
    
    function handleDetailsClick(sv:Service) {
      navigate(`/DetailSv/${sv.id}`, { state: { serviceData: sv }, replace: true });
    }
    function handleUpdatesClick(sv:Service) {
      navigate(`/UpdateSv/${sv.id}`, { state: { ServiceData: sv }, replace: true });
    }
    useEffect(  () => { 
      
       const  dbRef = ref(database);
      get(child(dbRef, "Service")).then((snapshot) => {
        if (snapshot.exists()) {
          const  data = snapshot.val();
         
          const  userArray  = Object.keys(data).map((key) => {
            return {
              id: key,
              Name_Sv: data[key].Name_Sv,
              Id_Sv: data[key].Id_Sv,
              Review_Sv:data[key].Review_Sv,
              Action_Sv:data[key].Action_Sv ,
              Date_Sv :data[key].Date_Sv         
            };
          });
          setService(userArray);
        }
      });
      
      // const fetchUsers = async () => {
      //   const usersRef = database.ref("Equip");
      //   const usersSnapshot = await usersRef.once("value");
  
      //   const fetchedUsers: Service[] = [];
      //   usersSnapshot.forEach((userSnapshot) => {
      //     const user = userSnapshot.val();
      //     fetchedUsers.push(user);
      //   });
  
      //   setService(fetchedUsers);
      // };
  
      // fetchUsers();
    }, []);
    
   
  
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
     
        
      const query: string = event.target.value.toLowerCase();
      const filteredServices: Service[] =service.filter((eq: Service) => {
        const name: string = eq.Id_Sv.toLowerCase();
        const address: string = eq.Name_Sv.toLowerCase();
        const service: string = eq.Review_Sv.toLowerCase();
        const id :string = eq.id.toLowerCase();
       
  
      
        return name.includes(query) || address.includes(query) || service.includes(query)|| id.includes(query);
        
      
  
      });
      if (query === "") {
        setService(service);
      } else {
        setService(filteredServices);
      
      }
    };
  
  
    const [selectedOption, setSelectedOption] = useState("Tất cả");
    
    const [open, setOpen] = useState(false);
  
    const handleOptionClick = (option: string ): void => {
      setSelectedOption(option);
      setOpen(false);
      const filterConnect: Service[] = service.filter((eq: Service) => {
        if (option === "Tất cả") {
          return true;
        }else if (option === "Hoạt động" && eq.Action_Sv === true  ) {
           
          
          return true;
          
        } else if (option === "Ngưng hoạt động"&& eq.Action_Sv === false ) {
          
          return true;
        }
        return false;
      });
    
      setService(filterConnect);
    };
    const [selectedOption1, setSelectedOption1] = useState("Tất cả");
    const [open1, setOpen1] = useState(false);
  
    const handleOptionClick1 = async ( option1: string) => {
      setSelectedOption1(option1);
      setOpen1(false);
      


     
    };
  return (
    <div>
    <Topbar />
    <Sidebar />
    <div className="ListEq_form">
      <div>
        <p className="List_name">Quản lý dịch vụ</p>
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
                    <span className="option_text" >Hoạt động{}</span>
                  </li>
                  <li className="option"onClick={() => handleOptionClick("Ngưng hoạt động")}>
                    <span className="option_text" >Ngưng hoạt động</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="Connect_status">
              <p>Chọn thời gian</p>
             <div className='Select_date'>
                <div className='select_dateS'>
                  <input type="date" value={"2020-10-10"}  />

                </div>
                <div className='imageDate'>
                  <img src={date} alt="" />
                </div>
                <div className='select_dateE'>
                <input type="date" value={"2020-10-18"}  />
                </div>
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
              <th className="thEuq" style={{ width: "150px" }}>
                Mã dịch vụ
              </th>
              <th style={{ width: "224px" }}>Tên dịch vụ</th>
              <th style={{ width: "230px" }}>Mô tả</th>
              <th style={{ width: "253px" }}>Trạng thái hoạt động</th>
              
             
              <th style={{ width: "125px" }}> </th>
              <th className="thEuqEnd" style={{ width: "125px" }}>
                {" "}
              </th>
            </tr>
             
            {/* {filteredService.length > 0 ? 
             filteredService.map((eq ,index) => (
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
            {
              service.map((sv, index) => (
              <tr key={sv.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
              <td>{sv.Id_Sv} </td>
              <td>{sv.Name_Sv}</td>
              <td>{sv.Review_Sv}</td>
              <td>{sv.Action_Sv ? <div><img className="imgList" src={connect} alt="" /><span>Hoạt động</span></div>  : <div><img className="imgList" src={disconnect} alt="" /><span>Ngưng hoạt động</span></div>}</td>
              <td className="Detail_ListEq"onClick={() => handleDetailsClick(sv)} >
                  Chi tiết
              </td>
              <td className="Detail_ListEq"onClick={() => handleUpdatesClick(sv)} >
                Cập nhật
              </td>
            </tr>
            ))}
          </table>
        </div>
      </div>
      <Link className="link-nav" to="/AddSv">
        <div className="btnAddEuq" >
          <img src={btnadd} />
          <p>Thêm dịch vụ</p>
        </div>
      </Link> 
      
    </div>
    
  </div>
  )
}

export default ListService
