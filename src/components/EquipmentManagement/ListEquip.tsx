import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/ListEquip.css";
import Topbar from "../Bar/ts/Topbar";
import Sidebar from "../Bar/ts/Sidebar";
import btnadd from "./assets/add-square.png";
import piSearch from "./assets/fi_search.png";
import piDrop from "./assets/fi_chevron-down.png";
import connect from "./assets/Ellipse2.png";
import disconnect from "./assets/Ellipse_1.png";
import { database } from "../../firebase";
import { ref, child, get } from "firebase/database";
import ReactPaginate from "react-paginate";
import { count } from "console";

interface Equipment {
  id: string;
  Id_Eq: string;
  Name_Eq: string;
  Type_Eq: string;
  Address_Eq: string;
  Connect_Eq: boolean;
  Action_Eq: boolean;
  Service_Eq: string;
  Username_Eq: string;
  Password_Eq: string;
}

// const ITEMS_PER_PAGE = 5;
// const dbRef = ref(database);

// get(child(dbRef, `Equip/`)).then((snapshot) => {
//   if (snapshot.exists()) {

//     const data = (snapshot.val()) ;
//     console.log(data);
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
const ListEquip = () => {
  const navigate = useNavigate();
  const [filterConnect, setFilterConnect] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 7;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(equipment.length / itemsPerPage);

  function ShowMore({ text } : any) {
    const [showAll, setShowAll] = useState(false);

    return (
        <>
            {showAll ? (
                <>
                    <p style={{ width: "268px"  , height:"60px" }}>{text}</p>
                    <a onClick={() => setShowAll(false)}></a>
                </>
            ) : (
                <div className="pageNext">
                    <p>{text.substr(0, 23)}...</p>
                    <a onClick={() => setShowAll(true)}>Xem Thêm</a>
                </div>
            )}
        </>
    );
}

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  function handleDetailsClick(eq: Equipment) {
    navigate(`/DetallEq/${eq.id}`, {
      state: { equipmentData: eq },
      replace: true,
    });
  }
  function handleUpdatesClick(eq: Equipment) {
    navigate(`/UpdateEq/${eq.id}`, {
      state: { equipmentData: eq },
      replace: true,
    });
  }
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "Equip")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const userArray = Object.keys(data).map((key) => {
          return {
            id: key,
            Name_Eq: data[key].Name_Eq,
            Id_Eq: data[key].Id_Eq,
            Type_Eq: data[key].Type_Eq,
            Address_Eq: data[key].Address_Eq,
            Connect_Eq: data[key].Connect_Eq,
            Action_Eq: data[key].Action_Eq,
            Service_Eq: data[key].Service_Eq,
            Username_Eq: data[key].Username_Eq,
            Password_Eq: data[key].Password_Eq,
          };
        });
        setEquipment(userArray);
      }
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilteredEquipment(true);
    const query: string = event.target.value.toLowerCase();
    const filteredEquipments: Equipment[] = equipment.filter(
      (eq: Equipment) => {
        const name: string = eq.Name_Eq.toLowerCase();
        const address: string = eq.Address_Eq.toLowerCase();
      
        const id: string = eq.Id_Eq.toLowerCase();

        return (
          name.includes(query) ||
          address.includes(query) ||
        
          id.includes(query)
        );
      }
    );

    setFilterConnect(filteredEquipments);
  };

  const [selectedOption, setSelectedOption] = useState("Tất cả");

  const [open, setOpen] = useState(false);

  const handleOptionClick = (option: string): void => {
    setFilteredEquipment(true);
    setSelectedOption(option);
    setOpen(false);
    const filterConnect: Equipment[] = equipment.filter((eq: Equipment) => {
      if (option === "Tất cả") {
        return true;
      } else if (option === "Hoạt động" && eq.Action_Eq === true) {
        return true;
      } else if (option === "Ngưng hoạt động" && eq.Action_Eq === false) {
        return true;
      }
      return false;
    });

    setFilterConnect(filterConnect);
  };
  const [selectedOption1, setSelectedOption1] = useState("Tất cả");
  const [open1, setOpen1] = useState(false);

  const handleOptionClick1 = async (option1: string) => {
    setFilteredEquipment(true);
    setSelectedOption1(option1);
    setOpen1(false);
    const filterConnect: Equipment[] = equipment.filter((eq: Equipment) => {
      if (option1 === "Tất cả") {
        return true;
      } else if (option1 === "Kết nối" && eq.Connect_Eq === true) {
        return true;
      } else if (option1 === "Mất kết nối" && eq.Connect_Eq === false) {
        return true;
      }
      return false;
    });

    setFilterConnect(filterConnect);
    // const query: string = event.target.value.toLowerCase();
    console.log(equipment);
  };
  console.log(equipment.length);

  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="ListEq_form">
        <div>
          <p className="List_name">Dach sách thiết bị</p>
        </div>
        <div className="Table_Status">
          <div className="List_status">
            <div className="Status_full">
              <div className="Action_status">
                <p>Trạng thái hoạt động</p>
                <div
                  className={`select_menu${open ? " select_menu_open" : ""}`}
                  onClick={() => setOpen(!open)}
                >
                  <div className="select_btn">
                    <span className="drop_select">{selectedOption}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="list">
                    <li
                      className="option"
                      onClick={() => handleOptionClick("Tất cả")}
                    >
                      <span className="option_text">Tất cả</span>
                    </li>
                    <li
                      className="option"
                      onClick={() => handleOptionClick("Hoạt động")}
                    >
                      <span className="option_text">Hoạt động{}</span>
                    </li>
                    <li
                      className="option"
                      onClick={() => handleOptionClick("Ngưng hoạt động")}
                    >
                      <span className="option_text">Ngưng hoạt động</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Connect_status">
                <p>Trạng thái kết nối</p>
                <div
                  className={`select_menu2${open1 ? " select_menu_open2" : ""}`}
                  onClick={() => setOpen1(!open1)}
                >
                  <div className="select_btn">
                    <span className="drop_select">{selectedOption1}</span>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="list">
                    <li
                      className="option"
                      onClick={() => handleOptionClick1("Tất cả")}
                    >
                      <span className="option_text">Tất cả</span>
                    </li>
                    <li
                      className="option"
                      onClick={() => handleOptionClick1("Kết nối")}
                    >
                      <span className="option_text">Kết nối</span>
                    </li>
                    <li
                      className="option"
                      onClick={() => handleOptionClick1("Mất kết nối")}
                    >
                      <span className="option_text">Mất kết nối</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="Search_Eq">
              <p>Từ khóa</p>
              <div className="Search_btn">
                <input placeholder="Nhập từ khóa" onChange={handleSearch} />
                <img src={piSearch} />
              </div>
            </div>
          </div>

          <div className="Table_Euq">
            <table>
              <tr>
                <th className="thEuq" style={{ width: "103px" }}>
                  Mã thiết bị
                </th>
                <th style={{ width: "99px" }}>Tên thiết bị</th>
                <th style={{ width: "138px" }}>Địa chỉ IP</th>
                <th style={{ width: "171px" }}>Trạng thái hoạt động</th>
                <th style={{ width: "145px" }}>Trạng thái kết nối</th>
                <th style={{ width: "268px" }}>Dịch vụ sử dụng</th>
                <th style={{ width: "82px" }}> </th>
                <th className="thEuqEnd" style={{ width: "106px" }}>
                  {" "}
                </th>
              </tr>

          
              {filteredEquipment
                ? filterConnect.map((eq, index) => (
                    <tr
                      key={eq.Id_Eq}
                      style={{
                        background: index % 2 === 0 ? "white" : "#FFF2E7",
                      }}
                    >
                      <td>{eq.Id_Eq} </td>
                      <td>{eq.Name_Eq}</td>
                      <td>{eq.Address_Eq}</td>
                      <td>
                        {eq.Action_Eq ? (
                          <div>
                            <img className="imgList" src={connect} alt="" />
                            <span>Hoạt động</span>
                          </div>
                        ) : (
                          <div>
                            <img className="imgList" src={disconnect} alt="" />
                            <span>Ngưng hoạt động</span>
                          </div>
                        )}
                      </td>
                      <td>
                        {eq.Connect_Eq ? (
                          <div>
                            <img className="imgList" src={connect} alt="" />
                            <span>Kết nối</span>
                          </div>
                        ) : (
                          <div>
                            <img className="imgList" src={disconnect} alt="" />
                            <span>Mất kết nối</span>
                          </div>
                        )}
                      </td>
                      <td>
                      <ShowMore
                        text={String(eq.Service_Eq)}/>
                      </td>
                      <td
                        className="Detail_ListEq"
                        onClick={() => handleDetailsClick(eq)}
                      >
                        Chi tiết
                      </td>
                      <td
                        className="Detail_ListEq"
                        onClick={() => handleUpdatesClick(eq)}
                      >
                        Cập nhật
                      </td>
                    </tr>
                  ))
                : equipment
                    .slice(pagesVisited, pagesVisited + itemsPerPage)
                    .map((eq, index) => (
                      <tr
                        key={eq.Id_Eq}
                        style={{
                          background: index % 2 === 0 ? "white" : "#FFF2E7",
                        }}
                      >
                        <td>{eq.Id_Eq} </td>
                        <td>{eq.Name_Eq}</td>
                        <td>{eq.Address_Eq}</td>
                        <td>
                          {eq.Action_Eq ? (
                            <div>
                              <img className="imgList" src={connect} alt="" />
                              <span>Hoạt động</span>
                            </div>
                          ) : (
                            <div>
                              <img
                                className="imgList"
                                src={disconnect}
                                alt=""
                              />
                              <span>Ngưng hoạt động</span>
                            </div>
                          )}
                        </td>
                        <td>
                          {eq.Connect_Eq ? (
                            <div>
                              <img className="imgList" src={connect} alt="" />
                              <span>Kết nối</span>
                            </div>
                          ) : (
                            <div>
                              <img
                                className="imgList"
                                src={disconnect}
                                alt=""
                              />
                              <span>Mất kết nối</span>
                            </div>
                          )}
                        </td>
                        <td>
                        <ShowMore
                        text={String(eq.Service_Eq)}/>
                      
                      </td>
                        <td
                          className="Detail_ListEq"
                          onClick={() => handleDetailsClick(eq)}
                        >
                          Chi tiết
                        </td>
                        <td
                          className="Detail_ListEq"
                          onClick={() => handleUpdatesClick(eq)}
                        >
                          Cập nhật
                        </td>
                      </tr>
                    ))}
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
        <Link className="link-nav" to="/AddEq">
          <div className="btnAddEuq">
            <img src={btnadd} />
            <p>Thêm thiết bị</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ListEquip;
