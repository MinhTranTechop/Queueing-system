import React, { useState } from "react";
import "../../css/Position/AddPosition.css";
import Navbar from "../../../Bar/ts/Sidebar";
import Topbar from "../../../Bar/ts/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../../../../firebase";


import "firebase/compat/database";

const AddPosition = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [review, setReview] = useState("");

  const handleAddUser = () => {
    if (!name || !review) {
      setError("Vui lòng nhập dữ liệu đầy đủ");
    } else {
      const userRef = database.ref("Position");
      const newUserRef = userRef.push();

      newUserRef.set({
        Name_Po: name,
        Count_Users: 0,
        Review_Po: review,
      });

      setError("");
      setName("");
      setReview("");

      navigate("/ListPo");
      // Thực hiện xử lý thêm dữ liệu vào Realtime Database
    }
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
        <form>
          <div className="addPo-group">
            <div>
              <div className="addPo-name">
                <p>Tên vai trò:</p>
                <input
                  className="textaddEq"
                  placeholder="Nhập tên vai trò "
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="addEq-phone">
                <p>Mô tả:</p>
                <input
                  className="textaddEq1"
                  placeholder="Nhập mô tả "
                  onChange={(e) => setReview(e.target.value)}
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
        <button className="addEq_Add" type="submit" onClick={handleAddUser}>
          Thêm
        </button>
      </div>
    </div>
  );
};

export default AddPosition;
