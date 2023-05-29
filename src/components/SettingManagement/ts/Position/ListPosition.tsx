import React ,{useState, useEffect}from "react";
import "../../css/Position/ListPosition.css"
import { Link ,useNavigate  , useParams} from "react-router-dom";
import Topbar from "../../../Bar/ts/Topbar";
import Sidebar from "../../../Bar/ts/Sidebar";
import btnadd from "../../../EquipmentManagement/assets/add-square.png";
import piSearch from "../../../EquipmentManagement/assets/fi_search.png";
import { database } from "../../../../firebase";
import { ref, child, get } from "firebase/database";

interface Position{
    id:string,
    
    Name_Po:string,
    Review_Po:string,
    Count_Users:number,
   
}

const ListPosition = () => {
    
    const navigate = useNavigate();
    const [filteredEquipment, setFilteredEquipment] = useState(false);
  const [filteredProgression, setFilteredProgression] = useState<Position[]>([]);
  const [progression, setProgression] = useState<Position[]>([]);
  
  function handleDetailsClick(eq:Position) {
    navigate(`/UpdatePo/${eq.id}`, { state: { ProgressionData: eq }, replace: true });
  }

 
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
        setProgression(userArray);
      }
    });
   
  }, []);
  
 
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
   
      setFilteredEquipment(true);
        const query: string = event.target.value.toLowerCase();
        const filteredEquipments: Position[] =progression.filter((eq: Position) => {

          const address: string = eq.Name_Po.toLowerCase();
          const service: string = eq.Count_Users.toString().toLowerCase();
          const id :string = eq.Review_Po.toLowerCase();
         
    
        
          return address.includes(query) || service.includes(query)|| id.includes(query);
          
        
    
        });
       
          setFilteredProgression(filteredEquipments);
        
        
      };
    
   
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="ListEq_form">
        <div>
          <p className="List_name">Danh sách vai trò</p>
        </div>
        <div className="Table_Status">
          <div className="List_status">
            <div className="Status_full">
            
             
           
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
                <th className="thEuq" style={{ width: "224px" }}>
                  Tên vai trò
                </th>
                <th style={{ width: "224px" }}>Số người dùng</th>
                <th style={{ width: "537px" }}>Mô tả</th>  
                <th className="thEuqEnd" style={{ width: "125px" }}>
                  {" "}
                </th>
              </tr>
               
                { filteredEquipment  ? 
                  filteredProgression.map((eq, index) => (
                    <tr key={eq.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                    <td>{eq.Name_Po} </td>
                    {/* <td>{eq.Count_Users}</td> */}
                    <td>{
                        

                      } </td>
                    <td>{eq.Review_Po}</td>
                 
                    
                    
                    <td className="Detail_ListEq"onClick={() => handleDetailsClick(eq)} >
                        Cập nhật
                    </td>
                   
                  </tr> 
                  ))
              : 
              
                progression.map((eq, index) => (
                <tr key={eq.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                <td>{eq.Name_Po} </td>
                <td>{eq.Count_Users}</td>
                <td>{eq.Review_Po}</td>
              
                
                
                <td className="Detail_ListEq"onClick={() => handleDetailsClick(eq)} >
                   Cập nhật
                </td>
               
              </tr> 
              ))
              }
               
            </table>
          </div>
        </div>
        <Link className="link-nav" to={`/AddPo`}>
          <div className="btnAddEuq" >
            <img src={btnadd} />
            <p>Thêm vai trò</p>
          </div>
        </Link> 
        
      </div>
      
    </div>
  )
}

export default ListPosition
