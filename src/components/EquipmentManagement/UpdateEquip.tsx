import React, { useState, useEffect } from "react";
import "./css/AddEquip.css";
import Navbar from "../Bar/ts/Sidebar";
import Topbar from "../Bar/ts/Topbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { database } from "../../firebase";
import fix from "../../assets/fi_x.png";
import { ref, child, get, update } from "firebase/database";
import piDrop from "../EquipmentManagement/assets/fi_chevron-down.png";

interface Service {
  Name_Sv: string;
  Action_Sv: boolean;
}
const AddEquip = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<any>();
  const [openAll, setOpenAll] = useState(false);
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `Equip/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          setEquipment(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  console.log(equipment);

  const [serviceList, setServiceList] = useState<Service[]>([]);
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "Service")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const userArray = Object.keys(data).map((key) => {
          return {
            id: key,
            Name_Sv: data[key].Name_Sv,
            Action_Sv: data[key].Action_Sv,
            Review_Sv: data[key].Review_Sv,
          };
        });
        setServiceList(userArray);
      }
    });
  }, []);
  const handleUpdate = () => {
    update(ref(database, `Equip/${id}`), {
      ...equipment,
      Type_Eq: selectedOption,
      Service_Eq: selectedOptionSv,
    });
    navigate("/ListEq");
  };

  // const [name, setName] = useState('');
  // const [service, setService] = useState('');
  // const [idE, setIdE] = useState('');
  // const [type, setType] = useState('');
  // const [address, setAddress] = useState('');

  const [error, setError] = useState("");

  const [selectedOption, setSelectedOption] = useState<string>( 
    ""
   );

  const [open, setOpen] = useState(false);
  const handleOptionClick = (option: string): void => {
    setOpenAll(true);
    setSelectedOption(option);

    setOpen(false);
  };

  
  
  const [selectedOptionSv, setSelectedOptionSv] = useState([""] );
  
  
  
  const [openSv, setOpenSv] = useState(false);

  const handleOptionClickSv = (option: string): void => {
    selectedOptionSv.push(option);
    
    setSelectedOptionSv(selectedOptionSv);

    setOpenSv(false);
  };
  const handleRemoveOption = (optionToRemove: string): void => {
    setSelectedOptionSv((prevOptions) =>
      prevOptions.filter((option: any) => option !== optionToRemove)
    );
  };
  return (
    <div className="AddEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Quản lý thiết bị</p>
      </div>
      <div className="addEq-form">
        <div>
          <span className="addEq_info">Thông tin thiết bị</span>
        </div>
        {equipment ? (
          <form key={equipment.id}>
            <div className="addEq-group">
              <div className="addEq-name">
                <p>Mã thiết bị:</p>
                <input
                  className="textaddEq"
                  placeholder="Nhập mã thiết bị "
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      Id_Eq: e.target.value,
                    })
                  }
                  value={equipment.Id_Eq}
                />
              </div>

              <div className="addEq-loginin">
                <p>Loại thiết bị:</p>

                <div
                  className={`select_menu${open ? " select_menu_open" : ""}`}
                  onClick={() => setOpen(!open)}
                >
                  <div className="select_btnUser">
                    <span className="drop_select">{selectedOption === "" ? (equipment.Type_Eq && setSelectedOption(equipment.Type_Eq.toString()))  : selectedOption}  </span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="ListEqType">
                    <li
                      className="option"
                      onClick={() => handleOptionClick("Kiosk")}
                    >
                      <span className="option_text">Kiosk</span>
                    </li>
                    <li
                      className="option"
                      onClick={() => handleOptionClick("Display counter")}
                    >
                      <span className="option_text">Display counter</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="addEq-phone">
                <p>Tên thiết bị:</p>
                <input
                  className="textaddEq"
                  placeholder="Nhập tên thiết bị "
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      Name_Eq: e.target.value,
                    })
                  }
                  value={equipment.Name_Eq}
                />
              </div>
              <div className="addEq-pass">
                <p>Tên Đăng nhập:</p>
                <input
                  className="textaddEq"
                  placeholder="Nhập tên đăng nhập "
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      userName_Eq: e.target.value,
                    })
                  }
                  value={equipment.userName_Eq}
                />
              </div>
              <div className="addEq-email">
                <p>Địa chỉ IP:</p>
                <input
                  className="textaddEq"
                  placeholder="Nhập địa chỉ IP "
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      Address_Eq: e.target.value,
                    })
                  }
                  value={equipment.Address_Eq}
                />
              </div>
              <div className="addEq-position">
                <p>Mật khẩu:</p>
                <input
                  className="textaddEq"
                  placeholder="Nhập mật khẩu "
                  onChange={(e) =>
                    setEquipment({
                      ...equipment,
                      Password_Eq: e.target.value,
                    })
                  }
                  value={equipment.Password_Eq}
                />
              </div>
              <div className="addEq-position">
                <p>Dịch vụ sử dụng:</p>
                <div
                  className={`select_menu${openSv ? " select_menu_open" : ""}`}
                  onClick={() => setOpenSv(!openSv)}
                >
                  <div className="select_btnSv_Eq">
                    <div className="DropdownSv_Eq">

                      
                     
                      
                       { selectedOptionSv.slice(1).map((alo: any) => (
                        <span className="drop_select1">
                          {alo}

                          <img
                            src={fix}
                            alt=""
                            onClick={() => handleRemoveOption(alo)}
                          />
                        </span>
                      ))} 
                    </div>
                    <img className="icon-wrap" src={piDrop} />
                  </div>

                  <ul className="listSv_Eq">
                    {serviceList.map((item) =>
                      item.Action_Sv === true ? (
                        <li
                          className="option"
                          onClick={() => handleOptionClickSv(item.Name_Sv)}
                        >
                          <span className="option_text">{item.Name_Sv}</span>
                        </li>
                      ) : (
                        <></>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <p></p>
        )}
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
        <Link to="/ListEq" className="linh-nav">
          <button className="addEq_No">Hủy bỏ</button>
        </Link>
        <button className="addEq_Add" type="submit" onClick={handleUpdate}>
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default AddEquip;
