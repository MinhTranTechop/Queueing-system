import React, { useEffect, useState } from "react";
import Navbar from "../../Bar/ts/Sidebar";
import Topbar from "../../Bar/ts/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import piDrop from "../../ServiceManagement/assets/fi_chevron-down.png";
import "../css/AddProgression.css";
import { database, dateNow } from "../../../firebase";
import moment from "moment";
import { ref, child, get, update } from "firebase/database";
import { log } from "console";

interface Progression {
  id: string;
  Id_Pr: string;
  NameSv_Pr: string;
  DateStart_Pr: string;
  DateEnd_Pr: string;
  Status_Pr: string;
  Produce_Pr: string;
  NameUsers_Pr: string;
}
const AddProgression = () => {
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("Name_User");
  const [id, setId] = useState([]);
  const navigate = useNavigate();
  const [popup, setPop] = useState(false);
  const clickButton = () => {
    
  };
  
  const [progress, setProgress] = useState<Progression[]>([]);
  const last = [...progress].pop() || ""
  const [nameSv, setNameSv] = useState("");
  const currentTime = moment().format("HH:mm:ss - DD/MM/YYYY");
  const currentTimeEnd = moment()
    .add(5, "days")
    .format("HH:mm:ss - DD/MM/YYYY");
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "Progression")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const userArray = Object.keys(data).map((key) => {
          return {
            id: key,
            NameSv_Pr: data[key].NameSv_Pr,
            Id_Pr: data[key].Id_Pr,
            DateStart_Pr: data[key].DateStart_Pr,
            DateEnd_Pr: data[key].DateEnd_Pr,
            Status_Pr: data[key].Status_Pr,
            Produce_Pr: data[key].Produce_Pr,
            NameUsers_Pr: data[key].NameUsers_Pr,
          };
        });
        setProgress(userArray);
      }
    });
    
  }, []);

 const handleAddUser = async () => {
  const initialId = 201000;
  setPop(!popup);
  const aa = progress.map((item) => item.id);

  console.log(aa);
  const userRef = database.ref("Progression");
  const newUserRef = userRef.push();
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    setId(Object.values(snapshot.val()));
  }
  const newId = initialId + aa.length + 1;
  newUserRef.set({
    Id_Pr: newId,
    NameSv_Pr: nameSv,
    DateStart_Pr: currentTime,
    DateEnd_Pr: currentTimeEnd,
    Status_Pr: "use",
    Produce_Pr: "Hệ thống",
    NameUsers_Pr: userName,
  });
  
  setDateStart(currentTime);
  setDateEnd(currentTimeEnd);
  setStt(newId);
 
  
};
const [stt, setStt] = useState<number>();
const [dateStart, setDateStart] = useState("");
const [dateEnd, setDateEnd] = useState("");
  const ListSv = [
    { id: 1, data: "Khám tim mạch" },
    { id: 2, data: "Khám sản-Phụ hoa" },
    { id: 3, data: "Khám răng hàm mặt" },
    { id: 4, data: "Khám tai mũi họng" },
    { id: 5, data: "Khám tổng quát" },
    { id: 6, data: "Khám nội soi" },
    { id: 7, data: "Khám tim" },
  ];
  const [selectedOption, setSelectedOption] = useState("Chọn dịch vụ");
  const [open, setOpen] = useState(false);
  const [progression, setProgression] = useState<Progression[]>([]);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
    const filterConnect: Progression[] = progression.filter(
      (eq: Progression) => {
        //   if (option === "Tất cả") {
        //     return true;
        //   }else if (option === "Đang chờ" && eq.Status_Pr ==="Đang chờ"  ) {
        //     return true;
        //   } else if (option === "Đã sử dụng"&& eq.Status_Pr === "Đã sử dụng" ) {
        //     return true;
        //   } else if (option === "Bỏ qua"&& eq.Status_Pr === "Bỏ qua" ) {
        //     return true;
        //   }
        //   return false;
      }
    );

    setProgression(filterConnect);
  };
  return (
    <div className="AddEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý Cấp số</p>
      </div>
      <div className="AddPr_Full">
        <div className="AddPr_form">
          <span className="addPr_info">Cấp số mới</span>
          <p className="NamePr">Dịch vụ khách hàng lực chọn</p>
          <div
            className={`select_menuAddPr${
              open ? " select_menu_openAddPr" : ""
            }`}
            onClick={() => setOpen(!open)}
          >
            <div className="select_btnAddPr">
              <span className="drop_selectPr">{selectedOption}</span>
              <img className="icon-wrap" src={piDrop} />
            </div>

            <ul className="listAddPr">
              {ListSv.map((item) => (
                <li
                  key={item.id}
                  className="option"
                  value={item.data}
                  onClick={() => {
                    setNameSv(item.data);
                    handleOptionClick(item.data);
                  }}
                >
                  <span className="option_text">{item.data}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link className="link-nav" to={`/ListPr`}>
          <div>
            <p className="btnBackPr">Hủy bỏ</p>
          </div>
        </Link>

        <div>
          <p
            className="btnAddPr"
            onClick={handleAddUser}
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            In số
          </p>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
               
                <div>
                  <div className="popup_header">
                    <h1>Số thứ tự được cấp</h1>
                    <h2>{stt} </h2>
                    <span>
                      Dv:{nameSv} <p>(tại quầy số 1)</p>
                    </span>
                  </div>
                  <div className="modal_footer">
                    <span>Thời gian cấp:{dateStart}</span>
                    <span>Hạn sữ dụng:{dateEnd}</span>
                  </div>
                </div>
             
                         </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProgression;
