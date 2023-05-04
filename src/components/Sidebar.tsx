  import React, {useState} from 'react';
  import './css/Sidebar.css';
  import logoAlta from '../assets/logo.png';
  import setting from '../assets/setting.png'
  import service from '../assets/Frame 332.png'
  import number from '../assets/fi_layers.png'
  import report from '../assets/Frame1.png'
  import item from '../assets/monitor.png'
  import dashboard from '../assets/element-4.png'
  import {Link} from 'react-router-dom'
  import iconlogout from "../assets/fi_log-out.png"
  import veto from '../assets/vertical.png'
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
        <a href="#" className="nav-link link-dark active " aria-current="page">
          <img src={dashboard}/>
          <svg className="bi me-2 " width="9" height="16"></svg>
          Dashboard
        </a>
      </li>
      <li>
        <Link className='link-nav' to="/ListEq"><a href="#" className="nav-link link-dark">
        <img src={item}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          
          Thiết bị  
        </a></Link>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
        <img src={service}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          Dịch vụ
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
        <img src={number}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          Cấp số 
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
        <img src={report}/>
          <svg className="bi me-2" width="9" height="16"></svg>
          Báo cáo
        </a>
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
        <li><p className="dropdown-item " >Quản lý vai trò</p></li>
        <li><p className="dropdown-item " >Quản lý tài khoản</p></li>
        <li><p className="dropdown-item " >Nhật ký người dùng</p></li>

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
  