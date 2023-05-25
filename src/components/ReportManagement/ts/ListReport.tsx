import React ,{useState, useEffect}from "react";
import "../css/ListReport.css"
import { Link ,useNavigate  , useParams} from "react-router-dom";
import Topbar from "../../Bar/ts/Topbar";
import Sidebar from "../../Bar/ts/Sidebar";
import btnadd from "../../EquipmentManagement/assets/add-square.png";
import Swit from "../../../assets/arrow-right.png"
import wait from "../../ProgressionManagement/assets/Blue.png"
import used from "../../ProgressionManagement/assets/Grey.png"
import disconnect from '../../EquipmentManagement/assets/Ellipse_1.png';
import date from '../../ServiceManagement/assets/Vector.png'
import { database } from "../../../firebase";
import { ref, child, get } from "firebase/database";
import { saveAs } from 'file-saver';


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

const ListReport = () => {
    const navigate = useNavigate();
    const [filteredEquipment, setFilteredEquipment] = useState(false);
  const [filteredProgression, setFilteredProgression] = useState<Progression[]>([]);
  const [progression, setProgression] = useState<Progression[]>([]);
  const [equipment, setEquipment] = useState<any>();
  function handleDetailsClick(eq:Progression) {
    navigate(`/DetailPr/${eq.id}`, { state: { ProgressionData: eq }, replace: true });
  }

  const downloadData = async () => {
    try {
      const dbRef = database.ref('Progression');
      const snapshot = await dbRef.once('value');
      const data = snapshot.val();
  
      const jsonContent = JSON.stringify(data);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
  
      saveAs(blob, 'data.txt');
    } catch (error) {
      console.error('Error downloading data:', error);
    }
  };

  useEffect(  () => { 
    
     const  dbRef = ref(database);
    get(child(dbRef, "Progression")).then((snapshot) => {
      if (snapshot.exists()) {
        const  data = snapshot.val();
        setEquipment(data);
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
          }else if (option ===eq.NameSv_Pr ) {
             
            
            return true;
            
          }
          return false;
        });
      
        setFilteredProgression(filterConnect);
      };
      const [openSTT, setOpenSTT] = useState(false);
    
      const handleOptionClickSTT = (optionSTT: string ): void => {
        setFilteredEquipment(true);
        setSelectedOption(optionSTT);
        setOpenSTT(false);
        const filterConnect: Progression[] = progression.filter((eq: Progression) => {
          if (optionSTT === "Tất cả") {
            return true;
          }else if (optionSTT ===eq.Id_Pr  ) {
             
            
            return true;
            
          }
          return false;
        });
      
        setFilteredProgression(filterConnect);
      };
      const [openDate, setOpenDate] = useState(false);
      const handleOptionClickDate = (optionDate: string ): void => {
        setFilteredEquipment(true);
        setSelectedOption(optionDate);
        setOpenDate(false);
        const filterConnect: Progression[] = progression.filter((eq: Progression) => {
          if (optionDate === "Tất cả") {
            return true;
          }else if (optionDate === eq.DateStart_Pr  ) {
             
            
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
     
      const [openPr, setOpenPr] = useState(false);
    
      const handleOptionClickPr = (optionPr: string ): void => {
       setFilteredEquipment(true)
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
      const handleSearch = (optionSelect :string)=> {
        
   
        const filterConnect: Progression[] = progression.filter((eq: Progression) => {
          if (optionSelect === "dateStart" ) {
         
          }else if (optionSelect === "DateEnd" && eq.Status_Pr ==="wait"  ) {
             
            
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
            
              
            
            {equipment? 

           
              <div className="Connect_status" >
              <p>Chọn thời gian</p>
             <div className='Select_datePr'>
                <div className='select_dateS'>
                  <input type="date"  
                 value={equipment.DateStart_Pr}  
               />

                </div>
                <div className='imageDate'>
                  <img src={date} alt="" />
                </div>
                <div className='select_dateE'>
                <input type="date" value={equipment.DateStart_Pr}  />
                </div>
             </div>
            </div>
           : <p></p>
             }
            </div>
           
          </div>

          <div className="Table_Rep">
            <table>
              <tr>
                <th className="thRep" style={{ width: "226px" }}>
                  STT
               
                  <div className={`select_menu${openSTT ? " select_menu_open" : ""}`} onClick={() => setOpenSTT(!openSTT)}>
                  <div className="select_btnRp" >
                  <img src={Swit} alt="" />
                  </div>
                  <ul className="listRpSTT">
                  <li className="option"  onClick={() => handleOptionClickSTT("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    {progression.map((item)=>(
                      
                    <li key={item.id} className="option"  onClick={() => handleOptionClickSTT(item.Id_Pr)}>
                      <span className="option_text">{item.Id_Pr}</span>
                    </li>
              ))}
                  </ul>
                </div>
                </th>
              
                <th style={{ width: "232px" }}>Tên dịch vụ  
                <div className={`select_menu${open ? " select_menu_open" : ""}`} onClick={() => setOpen(!open)}>
                  <div className="select_btnRp" >
                  <img src={Swit} alt="" />
                  </div>
                  <ul className="listRpDv">
                  <li className="option"  onClick={() => handleOptionClick("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    {progression.map((item)=>(
                      
                    <li key={item.id} className="option"  onClick={() => handleOptionClick(item.NameSv_Pr)}>
                      <span className="option_text">{item.NameSv_Pr}</span>
                    </li>
              ))}
                  </ul>
                </div></th>
                <th style={{ width: "238px" }}>THời gian cấp  <div className={`select_menu${openDate ? " select_menu_open" : ""}`} onClick={() => setOpenDate(!openDate)}>
                  <div className="select_btnRp" >
                  <img src={Swit} alt="" />
                  </div>
                  <ul className="listRpDate">
                  <li className="option"  onClick={() => handleOptionClickDate("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    {progression.map((item)=>(
                      
                    <li key={item.id} className="option"  onClick={() => handleOptionClickDate(item.DateStart_Pr)}>
                      <span className="option_text">{item.DateStart_Pr}</span>
                    </li>
              ))}
                  </ul>
                </div>
                </th>
                
               
                <th style={{ width: "216px" }}>Trạng thái  
                <div className={`select_menu2Rp${openPr ? " select_menu_open2Rp" : ""}`} onClick={() => setOpenPr(!openPr)}>
                  <div className="select_btnRp" >
                    <img src={Swit} alt="" />
                  </div>
                  <ul className="listRp">
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
                </div></th>
                <th style={{ width: "196px" }}> Nguồn cấp 
                <div className={`select_menuPr${open1 ? " select_menu_openPr" : ""}`} onClick={() => setOpen1(!open1)}>
                  <div className="select_btnRp" >
                  <img src={Swit} alt="" />
                  </div>
                  <ul className="listRpHT"  >
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
                </div></th>
             
              </tr>
               
                { filteredEquipment  ? 
                  filteredProgression.map((eq, index) => (
                    <tr key={eq.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                    <td>{eq.Id_Pr} </td>
                   
                    <td>{eq.NameSv_Pr}</td>
                    <td>{eq.DateStart_Pr}</td>
                   
                    <td>{eq.Status_Pr === "wait" ? <div><img className="imgList" src={wait} alt="" /><span>Đang chờ</span></div> :
                      eq.Status_Pr === "use" ?
                     <div><img className="imgList" src={used} alt="" /><span>Đã sử dụng</span></div> : <div><img className="imgList" src={disconnect} alt="" /><span>Bỏ qua</span></div>}</td> 
                    <td>{eq.Produce_Pr}</td>
                    
                   
                   
                  </tr> 
                  ))
              : 
              
                progression.map((eq, index) => (
                <tr key={eq.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                <td>{eq.Id_Pr} </td>
               
                <td>{eq.NameSv_Pr}</td>
                <td>{eq.DateStart_Pr}</td>
               
                <td>{eq.Status_Pr === "wait" ? <div><img className="imgList" src={wait} alt="" /><span>Đang chờ</span></div> :
                  eq.Status_Pr === "use" ?
                 <div><img className="imgList" src={used} alt="" /><span>Đã sử dụng</span></div> : <div><img className="imgList" src={disconnect} alt="" /><span>Bỏ qua</span></div>}</td> 
                <td>{eq.Produce_Pr}</td>
                
                
               
              </tr> 
              ))
              }
               
            </table>
          </div>
        </div>
        
          <div onClick={downloadData} className="btnAddRep" >
            <img src={btnadd} />
            <p>Tải về</p>
          </div>
       
        
      </div>
      
    </div>
  )
}

export default ListReport
