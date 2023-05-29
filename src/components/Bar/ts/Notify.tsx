import React , {useState , useEffect} from "react";
import '../css/Notify.css'
import iconNotify from "../../../assets/iconNotify.png"
import { database } from "../../../firebase";
import { ref, child, get } from "firebase/database";
import  moment  from "moment";
interface Progression{
  id:string,
  Id_Pr:string,
  NameSv_Pr:string,
  DateStart_Pr:string,
  DateEnd_Pr:string,
  Status_Pr:string,
  Produce_Pr:string,
  NameUsers_Pr:string
}
const Notify = () => {
  const [isActive, setIsActive] = useState(false);

  const [progression, setProgression] = useState<Progression[]>([]);
  const toggleDropdown = () => {
    setIsActive(!isActive);
  };
  useEffect(  () => { 
    
    const  dbRef = ref(database);
   get(child(dbRef, "Progression")).then((snapshot) => {
     if (snapshot.exists()) {
       const  data = snapshot.val();
       const  userArray  = Object.keys(data).reverse().map((key) => {
         return {
           id: key,
           NameSv_Pr: data[key].NameSv_Pr,
           Id_Pr: data[key].Id_Pr,
           DateStart_Pr :data[key].DateStart_Pr,
           DateEnd_Pr: data[key].DateEnd_Pr,
              Status_Pr:data[key].Status_Pr,
              Produce_Pr:data[key].Produce_Pr,
              NameUsers_Pr:data[key].NameUsers_Pr
              
         };
       });
       setProgression(userArray);
     }
   });

 }, []);
 
 
  return (
    <div className="notify_form" onClick={toggleDropdown}>
      <img src={iconNotify}/>
      <div className={`notify-dropdown${isActive ? " show" : ""}`}>
        
        <ul >
          <li className="notify_li" >
            <p className="dropdown_notify">Thông báo</p>
          </li>
          {progression.map((item)=> (
          <li key={item.id} >
            <p className="dropdown-item1">Người dùng :{item.NameUsers_Pr}</p>
            <p className="dropdown-item2">Thời gian nhận số : {moment(item.DateStart_Pr, "HH:mm:ss - DD/MM/YYYY").format("HH")+ ("h") + moment(item.DateStart_Pr, "HH:mm:ss - DD/MM/YYYY").format("mm") + (" ngày ")+moment(item.DateStart_Pr, "HH:mm:ss - DD/MM/YYYY").format("DD/MM/YYYY")}</p>
            <div className="line"></div>
          </li>
           ))}
        </ul>
       
      </div>
    </div>
  );
};

export default Notify;
