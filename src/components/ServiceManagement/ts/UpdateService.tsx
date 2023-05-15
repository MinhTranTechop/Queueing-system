import React , { useState ,useEffect} from 'react'
import '../css/UpdateService.css'
import Navbar from "../../Bar/ts/Sidebar";
import Topbar from "../../Bar/ts/Topbar";
import { Link, useNavigate ,useParams } from "react-router-dom";
import { database } from "../../../firebase";
import { ref, child, get ,update } from "firebase/database";
const UpdateService = () => {
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const [service, setService] = useState<any>();
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `Service/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        setService(data);
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
    update(ref(database,`Service/${id}`),{
      ...service
    });
    navigate('/ListSv')
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
      {service ? (
      <form  key={service.id} >
        <div className="addSv-group">
          <div>
            <div className="addEq-name">
              <p>Mã dịch vụ:</p>
              <input
                className="textaddEq"
                placeholder="201 "
                onChange={(e) => setService({
                  ...service,
                  Id_Sv : e.target.value
                })} value={service.Id_Sv} 
              />
            </div>

            <div className="addEq-loginin">
              <p>Tên dịch vụ:</p>
              <input
                className="textaddEq"
                placeholder="Khám tim mạch "
                onChange={(e) => setService({
                  ...service,
                  Name_Sv : e.target.value
                })} value={service.Name_Sv} 
              />
            </div>
          </div>
          <div className="addEq-phone">
            <p>Mô tả:</p>
            <input
              className="textaddEq"
              placeholder="Mô tả dịch vụ "
              onChange={(e) => setService({
                ...service,
                Review_Sv : e.target.value
              })} value={service.Review_Sv} 
            />
          </div>

          <div className="addSv_number">
            <p>Quy tắc cấp số</p>
            <div className="addSv_Checkbox">
              
              <div className="my_checkbox">
                <div>
                <input
                  type="checkbox"
                  id="my-checkbox"
                  name="my-checkbox"
                 
                />
                 <span className="box_check"></span>
                <label htmlFor="my-checkbox">Tăng tự động từ :</label>
                </div>
                <div className="my_checkbox_update">
                    <input type="text" value={"0001"} />
                    <span>Đến</span>
                    <input type="text" style={{left:"280px"}}value={"9999"} />
                </div>
              </div>
              <div className="my_checkbox">
              <div>
                <input
                  type="checkbox"
                  id="my-checkbox"
                  name="my-checkbox"
                
                />
                 <span className="box_check"></span>
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
                <span className="box_check"></span>
                <label htmlFor="my-checkbox">Surfix</label>
              </div>
              <input type="text" name="" id="" value={"0001"}/>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="my-checkbox"
                  name="my-checkbox"
                  
                />
                 <span className="box_check"></span>
                <label htmlFor="my-checkbox">Reset mỗi ngày</label>
              </div>
            </div>
          </div>
        </div>
      </form>
      ) : (
        <p></p>
      )}
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
      <Link to="/ListSv" className="linh-nav">
        <button className="addEq_No">Hủy bỏ</button>
      </Link>
      <button className="addEq_Add" type="submit" onClick={handleUpdate}>
        Cập nhật dịch vụ
      </button>
    </div>
  </div>
  )
}

export default UpdateService
