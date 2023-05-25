import React, { useState, useEffect } from "react";
import "../css/DetailService.css";
import Navbar from "../../Bar/ts/Sidebar";
import Topbar from "../../Bar/ts/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { database } from "../../../firebase";
import { ref, child, get, update } from "firebase/database";
import btnadd from "../assets/add-square.png";
import piSearch from "../assets/fi_search.png";
import piDrop from "../assets/fi_chevron-down.png";
import wait from "../../ProgressionManagement/assets/Blue.png"
import used from "../../ProgressionManagement/assets/Grey.png"
import connect from "../assets/Ellipse2.png"
import disconnect from "../assets/Ellipse_1.png";
import date from "../assets/Vector.png";

interface Number {
  Id_Nb: string;
  Status_Nb: boolean;
}

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
const DetailService = () => {
 
  const [filteredEquipment, setFilteredEquipment] = useState(false);
  const [filteredProgression, setFilteredProgression] = useState<Progression[]>([]);
  const [progression, setProgression] = useState<Progression[]>([]);
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>();
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

 }, []);
 const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
   
  setFilteredEquipment(true);
    const query: string = event.target.value.toLowerCase();
    const filteredEquipments: Progression[] =progression.filter((eq: Progression) => {

      const service: string = eq.Id_Pr.toString().toLowerCase();
      
     

    
      return  service.includes(query);
      
    

    });
   
      setFilteredProgression(filteredEquipments);
    
    
  };
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `Service/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          setService(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  
  const [selectedOptionPr, setSelectedOptionPr] = useState("Tất cả");
      const [openPr, setOpenPr] = useState(false);
    
      const handleOptionClickPr = (optionPr: string ): void => {
        setFilteredEquipment(true);
        setSelectedOptionPr(optionPr);
        setOpenPr(false);
        const filterConnect: Progression[] = progression.filter((eq: Progression) => {
          if (optionPr === "Tất cả" ) {
            return true;
          }else if (optionPr === "Đang thực hiện" && eq.Status_Pr ==="wait"  ) {
             
            
            return true;
            
          } else if (optionPr === "Đã hoàn thành"&& eq.Status_Pr === "use" ) {
            
            return true;
          } else if (optionPr === "Vắng"&& eq.Status_Pr === "back" ) {
            
            return true;
          }
          return false;
        });
      
        setFilteredProgression(filterConnect);
      };
  return (
    <div className="AddEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý dịch vụ</p>
      </div>
      <div className="DetailSV_Full">
        <div className="DetailSv-form">
          <div>
            <span className="addEq_info">Thông tin dịch vụ</span>
          </div>
          {service ? (
            <form key={service.id}>
              <div className="DetailSv-group">
                <div>
                  <div className="addEq-name">
                    <p>
                      Mã dịch vụ: <span>{service.Id_Sv}</span>{" "}
                    </p>
                  </div>

                  <div className="addEq-loginin">
                    <p>
                      Tên dịch vụ:<span> {service.Name_Sv}</span>{" "}
                    </p>
                  </div>
                </div>
                <div className="addEq-phone">
                  <p>
                    Mô tả: <span>{service.Review_Sv}</span>{" "}
                  </p>
                </div>

                <div className="DetailSv_number">
                  <p>Quy tắc cấp số</p>
                  <div className="DetailSv_Checkbox">
                    <div className="my_checkbox">
                      <div>
                        <label htmlFor="my-checkbox">Tăng tự động :</label>
                      </div>
                      <div className="my_checkbox_update1">
                        <input type="text" value={"0001"} />
                        <span>đến</span>
                        <input
                          type="text"
                          style={{ left: "231px" }}
                          value={"9999"}
                        />
                      </div>
                    </div>
                    <div className="my_checkbox">
                      <div>
                        <label htmlFor="my-checkbox">Prefix:</label>
                      </div>
                      <input type="text" name="" id="" value={"0001"} />
                    </div>
                    <div className="my_checkbox">
                      <div>
                        <label htmlFor="my-checkbox">Surfix</label>
                      </div>
                      <input type="text" name="" id="" value={"0001"} />
                    </div>
                    <div>
                      <label htmlFor="my-checkbox">Reset mỗi ngày</label>
                    </div>
                    <h6>Ví dụ :201-2001</h6>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <p></p>
          )}
        </div>
        <div className="ListSv_Number">
          <div className="TableSv_Status">
            <div className="List_status">
              <div className="Status_full">
                <div className="Action_status">
                  <p>Trạng thái </p>
                  <div className={`select_menu${openPr ? " select_menu_open" : ""}`} onClick={() => setOpenPr(!openPr)}>
                  <div className="select_btnSv" >
                    <span className="drop_select" >{selectedOptionPr}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="list3">
                    <li className="option"  onClick={() => handleOptionClickPr("Tất cả")}>
                      <span className="option_text">Tất cả</span>
                    </li>
                    <li className="option" onClick={() => handleOptionClickPr("Đang thực hiện")}>
                      <span className="option_text" >Đang thực hiện</span>
                    </li>
                    <li className="option"onClick={() => handleOptionClickPr("Đã hoàn thành")}>
                      <span className="option_text" >Đã hoàn thành</span>
                    </li>
                    <li className="option"onClick={() => handleOptionClickPr("Vắng")}>
                      <span className="option_text" >Vắng</span>
                    </li>
                  </ul>
                </div>
                </div>
                <div className="Connect_status">
                  <p>Chọn thời gian</p>
                  <div className="Select_dateSv">
                    <div className="select_dateS">
                      <input type="date" value={"2020-10-10"} />
                    </div>
                    <div className="imageDate">
                      <img src={date} alt="" />
                    </div>
                    <div className="select_dateE">
                      <input type="date" value={"2020-10-18"} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="SearchSv_Eq">
                <p>Từ khóa</p>
                <div className="SearchSv_btn">
                  <input placeholder="Nhập từ khóa" onChange={handleSearch} />
                  <img src={piSearch} />
                </div>
              </div>
            </div>

            <div className="Table_Number">
              <table>
                <tr>
                  <th className="thEuq" style={{ width: "370px" }}>
                    Số thứ tự
                  </th>
                  <th style={{ width: "370px" }}>Trạng thái</th>
                </tr>
                { filteredEquipment  ? 
                  filteredProgression.map((eq, index) => (
                <tr style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                  <td>{eq.Id_Pr} </td>
                  <td>{eq.Status_Pr === "wait" ? <div><img className="imgList" src={wait} alt="" /><span>Đang thực hiện</span></div> :
                  eq.Status_Pr === "use" ?
                 <div><img className="imgList" src={connect} alt="" /><span>Đã hoàn thành</span></div> : <div><img className="imgList" src={disconnect} alt="" /><span>Vắng</span></div>}</td> 
                </tr>
                  ))
                  :  progression.map((eq, index) => (
                  <tr style={{background: index % 2 === 0 ? "white" : "#FFF2E7"}}>
                  <td> {eq.Id_Pr}</td>
                  <td>{eq.Status_Pr === "wait" ? <div><img className="imgList" src={wait} alt="" /><span>Đang thực hiện</span></div> :
                  eq.Status_Pr === "use" ?
                 <div><img className="imgList" src={connect} alt="" /><span>Đã hoàn thành</span></div> : <div><img className="imgList" src={disconnect} alt="" /><span>Vắng</span></div>}</td> 
                </tr>
                ))
              }
              </table>
            </div>
            
          </div>
          
        </div>
        <Link className="link-nav" to={`/UpdateSv/${id}`}>
        <div className="btnUpSv" >
          <img src={btnadd} />
          <p>Cập nhật danh sách</p>
        </div>
      </Link> 
      <Link className="link-nav" to="/ListSv">
        <div className="btnBackSv" >
          <img src={btnadd} />
          <p>Quay lại</p>
        </div>
      </Link> 
      </div>
    </div>
  );
};

export default DetailService;
