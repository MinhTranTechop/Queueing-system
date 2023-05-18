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
import connect from "../assets/Ellipse2.png";
import disconnect from "../assets/Ellipse_1.png";
import date from "../assets/Vector.png";

interface Number {
  Id_Nb: string;
  Status_Nb: boolean;
}
const DetailService = () => {
  const [number, setNumber] = useState<Number[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>();
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
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {};
  const [selectedOption, setSelectedOption] = useState("Tất cả");

  const [open, setOpen] = useState(false);

  const handleOptionClick = (option: string): void => {
    setSelectedOption(option);
    setOpen(false);
    const filterConnect: Number[] = service.filter((eq: Number) => {
      if (option === "Tất cả") {
        return true;
      } else if (option === "Hoạt động" && eq.Status_Nb === true) {
        return true;
      } else if (option === "Ngưng hoạt động" && eq.Status_Nb === false) {
        return true;
      }
      return false;
    });

    setService(filterConnect);
  };
  return (
    <div className="AddEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý thiết bị</p>
      </div>
      <div className="DetailSV_Full">
        <div className="DetailSv-form">
          <div>
            <span className="addEq_info">Thông tin thiết bị</span>
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
                  <div
                    className={`select_menu${open ? " select_menu_open" : ""}`}
                    onClick={() => setOpen(!open)}
                  >
                    <div className="selectSv_btn">
                      <span className="drop_select">{selectedOption}</span>
                      <img className="icon-wrap" src={piDrop} />
                    </div>
                    <ul className="list3">
                      <li
                        className="option"
                        onClick={() => handleOptionClick("Tất cả")}
                      >
                        <span className="option_text">Tất cả</span>
                      </li>
                      <li
                        className="option"
                        onClick={() => handleOptionClick("Đã hoàn thành")}
                      >
                        <span className="option_text">Đã hoàn thành</span>
                      </li>
                      <li
                        className="option"
                        onClick={() => handleOptionClick("Đang thực hiện")}
                      >
                        <span className="option_text">Đang thực hiện</span>
                      </li>
                      <li
                        className="option"
                        onClick={() => handleOptionClick("Vắng")}
                      >
                        <span className="option_text">Vắng</span>
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
                    Mã dịch vụ
                  </th>
                  <th style={{ width: "370px" }}>Tên dịch vụ</th>
                </tr>

                <tr>
                  <td> </td>
                  <td></td>
                </tr>
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
