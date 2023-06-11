import React, { useState } from "react";
import "../css/AddService.css";
import Navbar from "../../Bar/ts/Sidebar";
import Topbar from "../../Bar/ts/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../../../firebase";
import moment from "moment";
import { dateNow } from "../../../firebase";
import "firebase/compat/database";

const AddService = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [id, setId] = useState("");

  const username = localStorage.getItem("userName");

  const [error, setError] = useState("");
  const [review, setReview] = useState("");
  const currentTime = moment().format("HH:mm:ss - DD/MM/YYYY");
  const [checked, setChecked] = useState(false);
  const [checkedPr, setCheckedPr] = useState(false);
  const [checkedSr, setCheckedSr] = useState(false);
  const [checkedRs, setCheckedRs] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
   
  };
  const toggleCheckbox1 = () => {
    
    setCheckedPr(!checkedPr);
    
  };
  const toggleCheckbox2 = () => {
   
    setCheckedSr(!checkedSr);
   
  };
  const toggleCheckbox3 = () => {
   
    setCheckedRs(!checkedRs);
  };

  const handleAddUser = () => {
    if (!name || !id || !review) {
      setError("Vui lòng nhập dữ liệu đầy đủ");
    } else {
      const userRef = database.ref("Service");
      const newUserRef = userRef.push();

      const notifyRef = database.ref("Notify");
      const newNotify = notifyRef.push();

      newUserRef.set({
        Name_Sv: name,
        Id_Sv: id,
        Review_Sv: review,
        Action_Sv: false,
        Date_Sv: dateNow,
        Auto_Sv:checked,
        Prefix_Sv:checkedPr,
        Sur_Sv:checkedSr,
        Reset_Sv:checkedRs
      });

      newNotify.set({
        Username_Nf: username,
        Date_Nf: currentTime,
        Address_Nf: "102.168.3.1",
        Describe_Nf: "Thêm thông tin dịch vụ " + id,
      });
      setError("");
      setName("");
      setReview("");
      setId("");

      navigate("/ListSv");
      // Thực hiện xử lý thêm dữ liệu vào Realtime Database
    }
  };

  return (
    <div className="AddEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý dịch vụ</p>
      </div>
      <div className="addEq-form">
        <div>
          <span className="addEq_info">Thông tin dịch vụ</span>
        </div>
        <form>
          <div className="addSv-group">
            <div>
              <div className="addEq-name">
                <p>Mã dịch vụ:</p>
                <input
                  className="textaddEq"
                  placeholder="201 "
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              <div className="addEq-loginin">
                <p>Tên dịch vụ:</p>
                <input
                  className="textaddEq"
                  placeholder="Khám tim mạch "
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="addEq-phone">
              <p>Mô tả:</p>
              <input
                className="textaddEq1"
                placeholder="Mô tả dịch vụ "
                onChange={(e) => setReview(e.target.value)}
              />
            </div>

            <div className="addSv_number">
              <p>Quy tắc cấp số</p>
              <div className="addSv_Checkbox">
                <div className="my_checkbox">
                  <div>
                    <input type="checkbox" id="my-checkbox" />
                    <span
                      className={`box_check ${checked ? "checked" : ""}`}
                      onClick={toggleCheckbox}
                    >
                      {" "}
                      {checked && <h6 className="checkmark">&#10004;</h6>}
                    </span>
                    <label htmlFor="my-checkbox">Tăng tự động từ :</label>
                  </div>
                  <div className="my_checkbox_update">
                    <input type="text" value={"0001"} />
                    <span>Đến</span>
                    <input
                      type="text"
                      style={{ left: "280px" }}
                      value={"9999"}
                    />
                  </div>
                </div>
                <div className="my_checkbox">
                  <div>
                    <input
                      type="checkbox"
                      id="my-checkbox"
                      name="my-checkbox"
                    />
                    <span
                      className={`box_check ${checkedPr ? "checked" : ""}`}
                      onClick={toggleCheckbox1}
                    >
                      {" "}
                      {checkedPr && <h6 className="checkmark">&#10004;</h6>}
                    </span>
                    <label htmlFor="my-checkbox">Prefix:</label>
                  </div>
                  <input type="text" name="" id="" value={"0001"} />
                </div>
                <div className="my_checkbox">
                  <div>
                    <input
                      type="checkbox"
                      id="my-checkbox"
                      name="my-checkbox"
                    />
                    <span
                      className={`box_check ${checkedSr ? "checked" : ""}`}
                      onClick={toggleCheckbox2}
                    >
                      {" "}
                      {checkedSr && <h6 className="checkmark">&#10004;</h6>}
                    </span>
                    <label htmlFor="my-checkbox">Surfix</label>
                  </div>
                  <input type="text" name="" id="" value={"0001"} />
                </div>
                <div>
                  <input type="checkbox" id="my-checkbox" name="my-checkbox" />
                  <span
                    className={`box_check ${checkedRs ? "checked" : ""}`}
                    onClick={toggleCheckbox3}
                  >
                    {" "}
                    {checkedRs && <h6 className="checkmark">&#10004;</h6>}
                  </span>
                  <label htmlFor="my-checkbox">Reset mỗi ngày</label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div>
          {error ? (
            <p className="addSv_warning" style={{ color: "red" }}>
              {error}
            </p>
          ) : (
            <p className="addSv_warning">Là trường thông tin bắt buộc</p>
          )}
        </div>
      </div>
      <div className="addEq_btn">
        <Link to="/ListEq" className="linh-nav">
          <button className="addEq_No">Hủy bỏ</button>
        </Link>
        <button className="addEq_Add" type="submit" onClick={handleAddUser}>
          Thêm dịch vụ
        </button>
      </div>
    </div>
  );
};

export default AddService;
