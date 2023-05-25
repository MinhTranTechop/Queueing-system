import React , {useState ,useEffect}from "react";
import "../../css/Users/UpdateUsers.css";
import Navbar from "../../../Bar/ts/Sidebar";
import Topbar from "../../../Bar/ts/Topbar";
import { Link, useNavigate ,useParams} from "react-router-dom";
import { database } from "../../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import piDrop from "../../../EquipmentManagement/assets/fi_chevron-down.png";
import { ref, child, get  ,update} from "firebase/database";

interface Position{
  Name_Po:string;
}

const UpdateUser = () => {
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>()
  const [user, setUser] = useState<any>();
  const [positionList , setPositionList] = useState<Position[]>([]);
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        setUser(data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [userId]);

  useEffect(  () => { 
    
    const  dbRef = ref(database);
   get(child(dbRef, "Position")).then((snapshot) => {
     if (snapshot.exists()) {
       const  data = snapshot.val();
       
       const  userArray  = Object.keys(data).map((key) => {
        return {
          id: key,
          Name_Po: data[key].Name_Po,
          Count_Users: data[key].Count_Users,
          Review_Po :data[key].Review_Po,
             
        };
      });
      setPositionList(userArray);
     }
   });

 }, []);
  const handleUpdate =  () => {
    // if (
    //  !service
    // ) {
    //   setError("Vui lòng nhập dữ liệu đầy đủ");
    // } else {
    update(ref(database,`users/${userId}`),{
      ...user
    });
    navigate('/ListUsers')
  
  };
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [openAll , setOpenAll] = useState(false);
  const inputType = showPassword ? "text" : "password";
  const [password1, setPassword1] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const [selectedOption, setSelectedOption] = useState("");
      
      const [open, setOpen] = useState(false);
  const handleOptionClick = (option: string ): void => {
    setOpenAll(true)
    setSelectedOption( option);
    setUser(option)
    setOpen(false);
   
  };
  const [selectedOptionPr, setSelectedOptionPr] = useState('');
  const [openPr, setOpenPr] = useState(false);
    
      const handleOptionClickPr = (optionPr: string ): void => {
        setSelectedOptionPr(optionPr);
        
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
        {user ? 
        <form > 
        <div className="addEq-group">
          <div className="addEq-name">
            <p>Họ tên:</p>
            <input className="textaddEq" placeholder="Nhập họ tên " onChange={(e) => setUser({
                    ...user,
                    Name_User : e.target.value
                  })}
                  value={user.Name_User} />
            
          </div>

          <div className="addEq-loginin">
            <p>Tên đăng nhập:</p>
            <input className="textaddEq" placeholder="Nhập tên đăng nhập "onChange={(e) => setUser({
                    ...user,
                    userName : e.target.value
                  })}
                  value={user.userName} /> 
          </div>
          <div className="addEq-phone">
            <p>Số điện thoại:</p>
            <input className="textaddEq" placeholder="Nhập số điện thoại " onChange={(e) => setUser({
                    ...user,
                    Phone_User : e.target.value
                  })}
                  value={user.Phone_User} />
          </div>
          <div className="addEq-pass">
            <p>Mật khẩu:</p>
            <input className="textaddEq" placeholder="Nhập mật khẩu " type={inputType}
              id="password"
               onChange={(e) => setUser({
                ...user,
                password : e.target.value
              })}
              value={user.password} />
            
        
          <div className="eyes">
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={toggleShowPassword}
            />
          </div>
          </div>
          <div className="addEq-email">
            <p>Email:</p>
            <input className="textaddEq" placeholder="Nhập email "onChange={(e) => setUser({
                    ...user,
                    email : e.target.value
                  })}
                  value={user.email} />
          </div>
          <div className="addEq-position">
            <p>Nhập lại mật khẩu:</p>
            <input className="textaddEq" placeholder="Nhập lại mật khẩu " type={inputType1}
              id="password1"
            
              value={user.password} />
           
          
          <div className="eyes">
            <FontAwesomeIcon
              icon={showPassword1 ? faEyeSlash : faEye}
              onClick={toggleShowPassword1}
            />
          </div>
          </div>
          <div className="addEq-position">
            <p>Vai trò:</p>
            {openAll ?
            <div className={`select_menu${open ? " select_menu_open" : ""}`} onClick={() => setOpen(!open)}>
                  <div className="select_btnUser" >
                    
                  <input className="drop_select"   value={selectedOption}/>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="listUserPo">
                 
                    {positionList.map((item)=>(
                      
                    <li  className="option"  onClick={() => handleOptionClick(item.Name_Po)}>
                      <span className="option_text">{item.Name_Po}</span>
                    </li>
              ))}
                  </ul>
                  </div>
                  :
                  <div className={`select_menu${open ? " select_menu_open" : ""}`} onClick={() => setOpen(!open)}>
                  <div className="select_btnUser" >
                    
                  <input className="drop_select" onChange={(e) => setUser({
                    ...user,
                    Position_User : e.target.value
                  })}  value={user.Position_User}/>
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="listUserPo">
                 
                    {positionList.map((item)=>(
                      
                    <li  className="option"  onClick={() => handleOptionClick(item.Name_Po)}>
                      <span className="option_text">{item.Name_Po}</span>
                    </li>
              ))}
                  </ul>
                  </div>
                  }
          </div>
          <div className="addEq-position">
            <p>Trạng thái:</p>
            {openAll ? 
            <div className={`select_menu2Rp${openPr ? " select_menu_open2Rp" : ""}`} onClick={() => setOpenPr(!openPr)}>
                  <div className="select_btnUser" >
                  <input className="drop_select"  value={selectedOptionPr}/>
                
                    <img className="icon-wrap" src={piDrop} />
                  </div>
                  <ul className="listUserAction">
                  
                    <li className="option" onClick={() => handleOptionClickPr("Hoạt động")}>
                      <span className="option_text" >Hoạt động</span>
                    </li>
                    <li className="option"onClick={() => handleOptionClickPr("Ngưng hoạt động")}>
                      <span className="option_text" >Ngưng hoạt động</span>
                    </li>
                   
                  </ul>
                </div>
                : <div className={`select_menu2Rp${openPr ? " select_menu_open2Rp" : ""}`} onClick={() => setOpenPr(!openPr)}>
                <div className="select_btnUser" >
                <input className="drop_select" onChange={(e) => setUser({
                  ...user,
                  Action_User : e.target.value
                })}  value={user.Action_User}/>
              
                  <img className="icon-wrap" src={piDrop} />
                </div>
                <ul className="listUserAction">
                
                  <li className="option" onClick={() => handleOptionClickPr("Hoạt động")}>
                    <span className="option_text" >Hoạt động</span>
                  </li>
                  <li className="option"onClick={() => handleOptionClickPr("Ngưng hoạt động")}>
                    <span className="option_text" >Ngưng hoạt động</span>
                  </li>
                 
                </ul>
              </div>}
          </div>
          
        </div>
        </form>
        : <p></p>
        }
        <div>
         
        {error ?  <p className="addEq_warning" style={{ color: "red" }}>{error}</p> :<p className="addEq_warning">Là trường thông tin bắt buộc</p>}
        </div>
      
      </div>
      <div className="addEq_btn">
        <Link to='/ListUsers' className="linh-nav"><button className="addEq_No">Hủy bỏ</button></Link>
        <button className="addEq_Add" type="submit" onClick={handleUpdate}>Cập nhật</button>
      </div>
    </div>
  );
};

export default UpdateUser;
