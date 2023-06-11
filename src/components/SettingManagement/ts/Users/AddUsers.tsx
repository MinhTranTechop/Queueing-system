import React, { useState, useEffect } from "react";
import "../../css/Users/AddUsers.css";
import Navbar from "../../../Bar/ts/Sidebar";
import Topbar from "../../../Bar/ts/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import piDrop from "../../../EquipmentManagement/assets/fi_chevron-down.png";
import { ref, child, get, update } from "firebase/database";

interface Position {
  id: string;
  Name_Po: string;
  Count_Users: number;
}
const AddUsers = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [action, setAction] = useState("");
  const [positionList, setPositionList] = useState<Position[]>([]);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "Position")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const userArray = Object.keys(data).map((key) => {
          return {
            id: key,
            Name_Po: data[key].Name_Po,
            Count_Users: data[key].Count_Users,
            Review_Po: data[key].Review_Po,
          };
        });
        setPositionList(userArray);
      }
    });
  }, []);

  const handleAddUser = async () => {
    if (!name || !phone || !email || !userName || !password || !password1) {
      setError("Vui lòng nhập dữ liệu đầy đủ");
    } else {
      const userRef = database.ref("users");
      const newUserRef = userRef.push();
      newUserRef.set({
        userName: userName,
        password: password,
        email: email,
        Position_User: position,
        Phone_User: phone,
        Action_User: action,
        Name_User: name,
      });
      const snapshot = await database.ref("users").once("value");
      const data = snapshot.val();
      let count = 0;

      // console.log(data1, data);

      for (const key in data) {
        for (const keys in positionList) {
          const userId = positionList[keys].id.toString();

          if (
            data[key].Position_User.toString() === position &&
            data[key].Position_User.toString() ===
              positionList[keys].Name_Po.toString()
          ) {
            count++;

            update(ref(database, `Position/${userId}`), {
              Count_Users: count,
            });
          }
        }
      }

      setError("");
      setName("");
      setEmail("");
      setAction("");
      setUserName("");
      setPassword("");
      setPosition("");
      setPhone("");
      navigate("/ListUsers");
      // Thực hiện xử lý thêm dữ liệu vào Realtime Database
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = showPassword ? "text" : "password";
  const [password1, setPassword1] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const [selectedOption, setSelectedOption] = useState("Chọn vai trò");

  const [open, setOpen] = useState(false);
  const handleOptionClick = (option: string): void => {
    setSelectedOption(option);
    setPosition(option);
    setOpen(false);
  };
  const [selectedOptionPr, setSelectedOptionPr] = useState("Hoạt động");
  const [openPr, setOpenPr] = useState(false);

  const handleOptionClickPr = (optionPr: string): void => {
    setSelectedOptionPr(optionPr);
    setAction(optionPr);
    setOpen(false);
  };
  const inputType1 = showPassword1 ? "text" : "password";
  return (
    <div className="AddEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý tài khoản</p>
      </div>
      <div className="addEq-form">
        <div>
          <span className="addEq_info">Thông tin tài khoản</span>
        </div>
        <form>
          <div className="addEq-group">
            <div className="addEq-name">
              <p>Họ tên:</p>
              <input
                className="textaddEq"
                placeholder="Nhập họ tên "
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="addEq-loginin">
              <p>Tên đăng nhập:</p>
              <input
                className="textaddEq"
                placeholder="Nhập tên đăng nhập "
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="addEq-phone">
              <p>Số điện thoại:</p>
              <input
                className="textaddEq"
                placeholder="Nhập số điện thoại "
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="addEq-pass">
              <p>Mật khẩu:</p>
              <input
                className="textaddEq"
                placeholder="Nhập mật khẩu "
                type={inputType}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="eyess">
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={toggleShowPassword}
                />
              </div>
            </div>
            <div className="addEq-email">
              <p>Email:</p>
              <input
                className="textaddEq"
                placeholder="Nhập email "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="addEq-position">
              <p>Nhập lại mật khẩu:</p>
              <input
                className="textaddEq"
                placeholder="Nhập lại mật khẩu "
                type={inputType1}
                id="password1"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />

              <div className="eyess">
                <FontAwesomeIcon
                  icon={showPassword1 ? faEyeSlash : faEye}
                  onClick={toggleShowPassword1}
                />
              </div>
            </div>
            <div className="addEq-position">
              <p>Vai trò:</p>
              <div
                className={`select_menu${open ? " select_menu_open" : ""}`}
                onClick={() => setOpen(!open)}
              >
                <div className="select_btnUser">
                  <span className="drop_select">{selectedOption}</span>
                  <img className="icon-wrap" src={piDrop} />
                </div>
                <ul className="listUserPo">
                  {positionList.map((item) => (
                    <li
                      className="option"
                      onClick={() => handleOptionClick(item.Name_Po)}
                    >
                      <span className="option_text">{item.Name_Po}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="addEq-position">
              <p>Trạng thái:</p>
              <div
                className={`select_menu2Rp${
                  openPr ? " select_menu_open2Rp" : ""
                }`}
                onClick={() => setOpenPr(!openPr)}
              >
                <div className="select_btnUser">
                  <span className="drop_select">{selectedOptionPr}</span>
                  <img className="icon-wrap" src={piDrop} />
                </div>
                <ul className="listUserAction">
                  <li
                    className="option"
                    onClick={() => handleOptionClickPr("Hoạt động")}
                  >
                    <span className="option_text">Hoạt động</span>
                  </li>
                  <li
                    className="option"
                    onClick={() => handleOptionClickPr("Ngưng hoạt động")}
                  >
                    <span className="option_text">Ngưng hoạt động</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
        <div>
          {error ? (
            <p className="addEq_warning" style={{ color: "red" }}>
              {error}
            </p>
          ) : (
            <p className="addEq_warning">Là trường thông tin bắt buộc</p>
          )}
        </div>
      </div>
      <div className="addEq_btn">
        <Link to="/ListUsers" className="linh-nav">
          <button className="addEq_No">Hủy bỏ</button>
        </Link>
        <button className="addEq_Add" type="submit" onClick={handleAddUser}>
          Thêm
        </button>
      </div>
    </div>
  );
};

export default AddUsers;
