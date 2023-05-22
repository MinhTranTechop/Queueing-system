import React ,{useState, useEffect}from "react";
import "../css/ListProgression.css"
import { Link ,useNavigate  , useParams} from "react-router-dom";
import Topbar from "../../Bar/ts/Topbar";
import Sidebar from "../../Bar/ts/Sidebar";
import btnadd from "../../EquipmentManagement/assets/add-square.png";
import piSearch from "../../EquipmentManagement/assets/fi_search.png";
import piDrop from "../../EquipmentManagement/assets/fi_chevron-down.png";
import wait from "../assets/Blue.png"
import used from "../assets/Grey.png"
import disconnect from '../../EquipmentManagement/assets/Ellipse_1.png';
import date from '../../ServiceManagement/assets/Vector.png'
import { database } from "../../../firebase";
import { ref, child, get } from "firebase/database";

interface Progression{
    id:string,
    Id_Pr:string,
    NameSv_Pr:string,
    DateStart_Pr:string,
    DateEnd_Pr:string,
    Status_Pr:string,
    Produce_Pr:string,
    NameUsers_Pr:string
}

const ListProgression = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [filteredEquipment, setFilteredEquipment] = useState(false);
  const [filteredProgression, setFilteredProgression] = useState<Progression[]>([]);
  const [progression, setProgression] = useState<Progression[]>([]);
  
  function handleDetailsClick(eq:Progression) {
    navigate(`/DetailPr/${eq.id}`, { state: { ProgressionData: eq }, replace: true });
  }

 
  useEffect(  () => { 
    
     const  dbRef = ref(database);
    get(child(dbRef, "Progression")).then((snapshot) => {
      if (snapshot.exists()) {
        const  data = snapshot.val();
        const  userArray  = Object.keys(data).map((key) => {
          return {
            id: key,
            NameSv_Pr: data[key].NameSv_Pr,
            Id_Pr: data[key].Id_Pr,
            DateStart_Pr :data[key].DateStart_Pr,
            DateEnd_Pr: data[key].DateEnd_Pr,
               Status_Pr:data[key].Status_Pr,
               Produce_Pr:data[key].Produce_Pr,
               NameUsers_Pr:data[key].NameUsers_Pr
               
          };
        });
        setProgression(userArray);
      }
    });
    // const fetchUsers = async () => {
    //   const usersRef = database.ref("Equip");
    //   const usersSnapshot = await usersRef.once("value");

    //   const fetchedUsers: Equipment[] = [];
    //   usersSnapshot.forEach((userSnapshot) => {
    //     const user = userSnapshot.val();
    //     fetchedUsers.push(user);
    //   });

    //   setEquipment(fetchedUsers);
    // };

    // fetchUsers();
  }, []);
  
 
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
   
      setFilteredEquipment(true);
        const query: string = event.target.value.toLowerCase();
        const filteredEquipments: Progression[] =progression.filter((eq: Progression) => {

          const address: string = eq.NameSv_Pr.toLowerCase();
          const service: string = eq.Produce_Pr.toLowerCase();
          const id :string = eq.NameUsers_Pr.toLowerCase();
         
    
        
          return address.includes(query) || service.includes(query)|| id.includes(query);
          
        
    
        });
       
          setFilteredProgression(filteredEquipments);
        
        
      };
    
      const ListSv =[
      
        {id:1,data: 'Khám tim mạch'},
        {id:2,data: 'Khám sản-Phụ hoa'},
        {id:3,data: 'Khám răng hàm mặt'},
        {id:4,data: 'Khám tai mũi họng'},
        {id:5,data: 'Khám tổng quát'},
        {id:6,data: 'Khám nội soi'},
        {id:7,data: 'Khám tim'},

    ];
      const [selectedOption, setSelectedOption] = useState("Tất cả");
      
      const [open, setOpen] = useState(false);
    
      const handleOptionClick = (option: string ): void => {
        setFilteredEquipment(true);
        setSelectedOption(option);
        setOpen(false);
        const filterConnect: Progression[] = progression.filter((eq: Progression) => {
          if (option === "Tất cả") {
            return true;
          }else if (option = ''  ) {
             
            
            return true;
            
          }
          return false;
        });
      
        setFilteredProgression(filterConnect);
      };
      const [selectedOption1, setSelectedOption1] = useState("Tất cả");
      const [open1, setOpen1] = useState(false);
    
      const handleOptionClick1 = async ( option1: string) => {
        setSelectedOption1(option1);
        setOpen1(false);
        const filterConnect: Progression[] =  progression.filter((eq: Progression) => {
          if (option1 === "Tất cả") {
             return true;
          }else if (option1 === "Kiosk" && eq.Produce_Pr === "Kiosk"  ) {
             
            
            return true;
            
          } else if (option1 === "Hệ thống"&& eq.Produce_Pr === "Hệ thống" ) {
            
            return true;
          }
          return false;
        });
      
        setFilteredProgression(filterConnect);
        // const query: string = event.target.value.toLowerCase();
       
      };
      const [selectedOptionPr, setSelectedOptionPr] = useState("Tất cả");
      const [openPr, setOpenPr] = useState(false);
    
      const handleOptionClickPr = (optionPr: string ): void => {
        setSelectedOptionPr(optionPr);
        setOpen(false);
        const filterConnect: Progression[] = progression.filter((eq: Progression) => {
          if (optionPr === "Tất cả" ) {
            return true;
          }else if (optionPr === "Đang chờ" && eq.Status_Pr ==="wait"  ) {
             
            
            return true;
            
          } else if (optionPr === "Đã sử dụng"&& eq.Status_Pr === "use" ) {
            
            return true;
          } else if (optionPr === "Bỏ qua"&& eq.Status_Pr === "back" ) {
            
            return true;
          }
          return false;
        });
      
        setFilteredProgression(filterConnect);
      };
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="ListEq_form">
        <div>
          <p className="List_name">Quản lý cấp sô</p>
        </div>
        <div className="Table_Status">
          <div className="List_status">
            <div className="Status_full">
              <div className="Action_status">
                <p>Tên dịch vụ</p>
                <div className={`select_menu${open ? " select_menu_open" : ""}`} onClick={() => setOpen(!open)}>
                  <div className="select_btnSv" >
                    <span className="drop_select" >{selectedOption}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="listSv">
                  <li className="option"  onClick={() => handleOptionClick("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    {ListSv.map((item)=>(
                      
                    <li key={item.id} className="option"  onClick={() => handleOptionClick(item.data)}>
                      <span className="option_text">{item.data}</span>
                    </li>
              ))}
                  </ul>
                </div>
              </div>
              
              <div className="Action_status">
                <p>Tình trạng</p>
                <div className={`select_menu2${openPr ? " select_menu_open2" : ""}`} onClick={() => setOpenPr(!openPr)}>
                  <div className="select_btnSv" >
                    <span className="drop_select" >{selectedOptionPr}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="listSv">
                    <li className="option"  onClick={() => handleOptionClickPr("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    <li className="option" onClick={() => handleOptionClickPr("Đang chờ")}>
                      <span className="option_text" >Đang chờ</span>
                    </li>
                    <li className="option"onClick={() => handleOptionClickPr("Đã sử dụng")}>
                      <span className="option_text" >Đã sử dụng</span>
                    </li>
                    <li className="option"onClick={() => handleOptionClickPr("Bỏ qua")}>
                      <span className="option_text" >Bỏ qua</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Connect_status">
                <p>Nguồn cấp</p>
                <div className={`select_menuPr${open1 ? " select_menu_openPr" : ""}`} onClick={() => setOpen1(!open1)}>
                  <div className="select_btnSv" >
                    <span className="drop_select" >{selectedOption1}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="listSv" onClick={() => handleSearch} >
                    <li className="option"  onClick={() => handleOptionClick1("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    <li className="option" onClick={() => handleOptionClick1("Kiosk")}>
                      <span className="option_text" >Kiosk</span>
                    </li>
                    <li className="option"onClick={() => handleOptionClick1("Hệ thống")}>
                      <span className="option_text" >Hệ thống</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Connect_status">
              <p>Chọn thời gian</p>
             <div className='Select_datePr'>
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
              <div className="Search_btnPr" >
                <input placeholder="Nhập từ khóa" onChange={handleSearch} />
                <img src={piSearch} />
              </div>
            </div>
          </div>

          <div className="Table_Euq">
            <table>
              <tr>
                <th className="thEuq" style={{ width: "93px" }}>
                  STT
                </th>
                <th style={{ width: "162px" }}>Tên khách hàng</th>
                <th style={{ width: "171px" }}>Tên dịch vụ</th>
                <th style={{ width: "161px" }}>THời gian cấp</th>
                
                <th style={{ width: "174px" }}>Hạn sử dụng</th>
                <th style={{ width: "147px" }}>Trạng thái</th>
                <th style={{ width: "120px" }}> Nguồn cấp</th>
                <th className="thEuqEnd" style={{ width: "85px" }}>
                  {" "}
                </th>
              </tr>
               
                { filteredEquipment  ? 
                  filteredProgression.map((eq, index) => (
                    <tr key={eq.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                    <td>{eq.Id_Pr} </td>
                    <td>{eq.NameUsers_Pr}</td>
                    <td>{eq.NameSv_Pr}</td>
                    <td>{eq.DateStart_Pr}</td>
                    <td>{eq.DateEnd_Pr}</td>
                    <td>{eq.Status_Pr === "wait" ? <div><img className="imgList" src={wait} alt="" /><span>Đang chờ</span></div> :
                      eq.Status_Pr === "use" ?
                     <div><img className="imgList" src={used} alt="" /><span>Đã sử dụng</span></div> : <div><img className="imgList" src={disconnect} alt="" /><span>Bỏ qua</span></div>}</td> 
                    <td>{eq.Produce_Pr}</td>
                    
                    <td className="Detail_ListEq"onClick={() => handleDetailsClick(eq)} >
                        Chi tiết
                    </td>
                   
                  </tr> 
                  ))
              : 
              
                progression.map((eq, index) => (
                <tr key={eq.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                <td>{eq.Id_Pr} </td>
                <td>{eq.NameUsers_Pr}</td>
                <td>{eq.NameSv_Pr}</td>
                <td>{eq.DateStart_Pr}</td>
                <td>{eq.DateEnd_Pr}</td>
                <td>{eq.Status_Pr === "wait" ? <div><img className="imgList" src={wait} alt="" /><span>Đang chờ</span></div> :
                  eq.Status_Pr === "use" ?
                 <div><img className="imgList" src={used} alt="" /><span>Đã sử dụng</span></div> : <div><img className="imgList" src={disconnect} alt="" /><span>Bỏ qua</span></div>}</td> 
                <td>{eq.Produce_Pr}</td>
                
                <td className="Detail_ListEq"onClick={() => handleDetailsClick(eq)} >
                    Chi tiết
                </td>
               
              </tr> 
              ))
              }
               
            </table>
          </div>
        </div>
        <Link className="link-nav" to={`/AddPr`}>
          <div className="btnAddEuq" >
            <img src={btnadd} />
            <p>Cấp số mới</p>
          </div>
        </Link> 
        
      </div>
      
    </div>
  )
}

export default ListProgression
