import React, { useState ,useEffect } from "react";
import "../../css/Position/UpdatePosition.css";
import Navbar from "../../../Bar/ts/Sidebar";
import Topbar from "../../../Bar/ts/Topbar";
import { Link, useNavigate ,useParams } from "react-router-dom";
import { database } from "../../../../firebase";
import { ref, child, get ,update } from "firebase/database";

import 'firebase/compat/database';

const UpdatePosition = () => {
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const [position, setPosition] = useState<any>();
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `Position/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        setPosition(data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [id]);

  const handleUpdate =  () => {
    // if (
    //  !service
    // ) {
    //   setError("Vui lòng nhập dữ liệu đầy đủ");
    // } else {
    update(ref(database,`Position/${id}`),{
      ...position
    });
    navigate('/ListPo')
  
  };

  return (
    <div className="AddEq-main">
      <Navbar />
      <Topbar />
      <div>
        <p className="Add_name">Danh sách vai trò</p>
      </div>
      <div className="addPo-form">
        <div>
          <span className="addEq_info">Thông tin vai trò</span>
        </div>
{position ?
        <form>
          <div className="addPo-group">
            <div>
              <div className="addPo-name">
                <p>Tên vai trò:</p>
                <input
                  className="textaddEq"
                  placeholder="Nhập tên vai trò "
                  onChange={(e) => setPosition({
                    ...position,
                    Name_Po : e.target.value
                  })}
                  value={position.Name_Po}
                />
              </div>

             <div className="addEq-phone">
              <p>Mô tả:</p>
              <input
                className="textaddEq1"
                placeholder="Nhập mô tả "
                onChange={(e) => setPosition({
                  ...position,
                  Review_Po : e.target.value
                })}
                value={position.Review_Po}
              />
            </div>

            </div>
            
            <div className="addPo_number">
              <p>Phân quyền chức năng</p>
              <div className="addPo_checkboxform">
              <div className="addPo_Checkbox">
                <span>Nhóm chức năng A</span>
                <div className="myPo_checkbox">
                  <div>
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    name="my-checkbox"
                   
                  />
                   <span className="box_check"></span>
                  <label htmlFor="myPo-checkbox">Tất cả</label>
                  </div>
                  
                </div>
                <div className="myPo_checkbox">
                <div>
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    name="my-checkbox"
                  
                  />
                   <span className="box_check"></span>
                  <label htmlFor="myPo-checkbox">Chức năng x</label>
                </div>
                
                </div>
                <div className="myPo_checkbox">
                <div>
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    name="my-checkbox"
                    
                  />
                  <span className="box_check"></span>
                  <label htmlFor="myPo-checkbox">Chức năng y</label>
                </div>
                
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    name="my-checkbox"
                    
                  />
                   <span className="box_check"></span>
                  <label htmlFor="myPo-checkbox">Chức năng z</label>
                </div>
              </div>
              <div className="addPo_Checkbox">
              <span>Nhóm chức năng B</span>
                <div className="myPo_checkbox">
                  <div>
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    name="my-checkbox"
                   
                  />
                   <span className="box_check"></span>
                  <label htmlFor="myPo-checkbox">Tất cả</label>
                  </div>
                  
                </div>
                <div className="myPo_checkbox">
                <div>
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    name="my-checkbox"
                  
                  />
                   <span className="box_check"></span>
                  <label htmlFor="myPo-checkbox">Chức năng x</label>
                </div>
                
                </div>
                <div className="myPo_checkbox">
                <div>
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    name="my-checkbox"
                    
                  />
                  <span className="box_check"></span>
                  <label htmlFor="myPo-checkbox">Chức năng y</label>
                </div>
                
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="my-checkbox"
                    name="my-checkbox"
                    
                  />
                   <span className="box_check"></span>
                  <label htmlFor="myPo-checkbox">Chức năng z</label>
                </div>
              </div>
              </div>
            </div>
          </div>
        </form>
        :
        <p></p>
         }
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
        <Link to="/ListPo" className="linh-nav">
          <button className="addEq_No">Hủy bỏ</button>
        </Link>
        <button className="addEq_Add" type="submit" onClick={handleUpdate}>
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default UpdatePosition;
