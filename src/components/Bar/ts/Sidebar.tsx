  import React, {useState} from 'react';
  import '../css/Sidebar.css';
  import logoAlta from '../../../assets/logo.png';
  import setting from '../../../assets/setting.png'
  import service from '../../../assets/Frame 332.png'
  import number from '../../../assets/fi_layers.png'
  import report from '../../../assets/Frame1.png'
  import item from '../../../assets/monitor.png'
  import dashboard from '../../../assets/element-4.png'
  import {Link} from 'react-router-dom'
  import iconlogout from "../../../assets/fi_log-out.png"
  import veto from '../../../assets/vertical.png'
  const Navbar:React.FC = () => {

  const nav = document.querySelectorAll('a');
  
  nav.forEach(element=>{
    element.addEventListener("click",function(){
      nav.forEach(nav=>nav.classList.remove("active"))
      this.classList.add("active")
    })
  }) 
  
  
    const [isActive, setIsActive] = useState(false);
  
    const toggleDropdown = () => {
      setIsActive(!isActive);
    };
  
    return (
      <div>
 <div className="menubar " >
    
      <svg className="bi me-2" width="40" height="32"></svg>
      <span className="">
        <img className='logomain' src={logoAlta}/>
      </span>
    
    <ul className="nav ">
      <li className="nav-item">
      <Link className=' nav-link link-dark' to="/Dashboard"> 
          <img src={dashboard}/>
          <svg className="bi me-2 " width="9" height="16"></svg>
          Dashboard
        </Link>
      </li>
      <li>
        <Link className=' nav-link link-dark' to="/ListEq"> 
        <img src={item}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          
          Thiết bị  
        </Link>
      </li>
      <li>
       <Link className='nav-link link-dark' to="/ListSv"> 
        <img src={service}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          Dịch vụ
       
        </Link>
      </li>
      <li>
        <Link className='nav-link link-dark' to="/ListPr">
        <img src={number}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          Cấp số 
       </Link>
      </li>
      <li>
      <Link className='nav-link link-dark' to="/ListRp">
        <img src={report}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          Báo cáo
        </Link>
      </li>
      <li>
      <div className="dropdown" onClick={toggleDropdown}>
      
        <a href="#" className="nav-link link-dark " >
        <img src={setting}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          Cài đặt hệ thống <img src={veto}/>
        
        </a>
        
      
      <div className={`dropdown-menu${isActive ? " show" : ""}`}>
        <ul className="link_name" aria-labelledby="dropdownUser2">
        <Link className='link_nav ' to={"/ListPo"}><li><p className="dropdown-item " >Quản lý vai trò</p></li></Link>
        <Link className='link_nav' to={"/ListUsers"}><li><p className="dropdown-item " >Quản lý tài khoản</p></li></Link>
        <Link className='link_nav ' to={"/NotifyUsers"}><li><p className="dropdown-item " >Nhật ký người dùng</p></li></Link>

      </ul>
        </div>
        </div>
      </li>
    </ul>
   
    
    <div  className='logout'>
      <Link to='/login'><button className='btnlogout'>
        <img src={iconlogout}/>
        Đăng xuất
      </button>
      </Link>
    </div>
  </div>
      </div>
      
    )
  }
  
  export default Navbar
  