import React ,{useState, useEffect}from "react";
import "../../css/Users/NotifyUsers.css"
import { Link ,useNavigate  , useParams} from "react-router-dom";
import Topbar from "../../../Bar/ts/Topbar";
import Sidebar from "../../../Bar/ts/Sidebar";
import date from "../../../ServiceManagement/assets/Vector.png";
import piSearch from "../../../EquipmentManagement/assets/fi_search.png";
import { database } from "../../../../firebase";
import { ref, child, get } from "firebase/database";
import ReactPaginate from 'react-paginate';

interface Notify{
    id:string,
    Username_Nf:string,
    Date_Nf:string,
    Address_Nf:string,
    Describe_Nf:string
   
}

const NotifyUsers = () => {
    
    const navigate = useNavigate();
    const [filteredEquipment, setFilteredEquipment] = useState(false);
  const [filteredProgression, setFilteredProgression] = useState<Notify[]>([]);
  const [progression, setProgression] = useState<Notify[]>([]);
  
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 7;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(progression.length / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };
 
  useEffect(  () => { 
    
     const  dbRef = ref(database);
    get(child(dbRef, "Notify")).then((snapshot) => {
      if (snapshot.exists()) {
        const  data = snapshot.val();
        const  userArray  = Object.keys(data).map((key) => {
          return {
            id: key,
            Username_Nf: data[key].Username_Nf,
            Date_Nf: data[key].Date_Nf,
            Address_Nf :data[key].Address_Nf,
            Describe_Nf :data[key].Describe_Nf,
            
               
          };
        });
        setProgression(userArray);
      }
    });
   
  }, []);
  
 
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
   
      setFilteredEquipment(true);
        const query: string = event.target.value.toLowerCase();
        const filteredEquipments: Notify[] =progression.filter((eq: Notify) => {

          const address: string = eq.Username_Nf.toLowerCase();
          const service: string = eq.Address_Nf.toString().toLowerCase();
          const id :string = eq.Describe_Nf.toLowerCase();
         
    
        
          return address.includes(query) || service.includes(query)|| id.includes(query);
          
        
    
        });
       
          setFilteredProgression(filteredEquipments);
        
        
      };
    
   
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="ListEq_form">
       
        <div className="Table_Status">
          <div className="List_status">
            <div className="Status_full">
            
            <div className="Connect_status" >
              <p>Chọn thời gian</p>
             <div className='Select_datePr'>
                <div className='select_dateS'>
                  <input type="date"  
                 value={'29/05/2021'}  
               />

                </div>
                <div className='imageDate'>
                  <img src={date} alt="" />
                </div>
                <div className='select_dateE'>
                <input type="date" value={'29/05/2023'}  />
                </div>
             </div>
            </div>
           
            </div>
            <div className="Search_Eq">
              <p>Từ khóa</p>
              <div className="Search_btnNf" >
                <input placeholder="Nhập từ khóa" onChange={handleSearch} />
                <img src={piSearch} />
              </div>
            </div>
          </div>

          <div className="Table_Euq">
            <table>
              <tr>
                <th className="thEuq" style={{ width: "266px" }}>
                  Tên đăng nhập
                </th>
                <th style={{ width: "240px" }}>Thời gian tác động</th>
                <th style={{ width: "216px" }}>IP thực hiện</th>  
                <th className="thEuqEnd" style={{ width: "393px" }}>
                    Thao tác thực hiện
                </th>
              </tr>
               
                { filteredEquipment  ? 
                  filteredProgression.map((eq, index) => (
                    <tr key={eq.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                    <td>{eq.Username_Nf} </td>
           
                    <td>{
                        eq.Date_Nf

                      } </td>
                    <td>{eq.Address_Nf}</td>
                 
                    
                    
                    <td className="Detail_ListEq" >
                        {eq.Describe_Nf}
                    </td>
                   
                  </tr> 
                  ))
              : 
              
                progression.slice(pagesVisited, pagesVisited + itemsPerPage).map((eq, index) => (
                <tr key={eq.id} style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                <td>{eq.Username_Nf} </td>
                <td>{eq.Date_Nf}</td>
                <td>{eq.Address_Nf}</td>
              
                
                
                <td className="" >
                {eq.Describe_Nf}
                </td>
               
              </tr> 
              ))
              }
               
            </table>
            <ReactPaginate
       
       pageCount={pageCount}
       onPageChange={handlePageChange}
       containerClassName="pagination"
       
       
       disabledClassName="disabled-page"
       activeLinkClassName="active-page"
       pageClassName="page-item"
       pageLinkClassName="page-link"
     />
          </div>
        </div>
        
        
      </div>
      
    </div>
  )
}

export default NotifyUsers
