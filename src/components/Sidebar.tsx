  import React from 'react';
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
  const Navbar:React.FC = () => {
    
    return (
      <div>
 <div className="menubar " >
    
      <svg className="bi me-2" width="40" height="32"></svg>
      <span className="">
        <img className='logomain' src={logoAlta}/>
      </span>
    
    <ul className="nav ">
      <li className="nav-item">
        <a href="#" className="nav-link link-dark " aria-current="page">
          <img src={dashboard}/>
          <svg className="bi me-2 " width="16" height="16"></svg>
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
        <img src={item}/>
          <svg className="bi me-2" width="16" height="16"></svg>
          
          Thiết bị  
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
        <img src={service}/>
          <svg className="bi me-2" width="16" height="16"></svg>
          Dịch vụ
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
        <img src={number}/>
          <svg className="bi me-2" width="16" height="16"></svg>
          Cấp số 
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
        <img src={report}/>
          <svg className="bi me-2" width="16" height="16"></svg>
          Báo cáo
        </a>
      </li>
      <li>
      <div className="dropdown">
        <a href="#" className="nav-link link-dark dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={setting}/>
          <svg className="bi me-2" width="16" height="16"></svg>
          Cài đặt hệ thống 
        </a>
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><a className="dropdown-item" href="#">Quản lý vai trò</a></li>
        <li><a className="dropdown-item" href="#">Quản lý tài khoản</a></li>
        <li><a className="dropdown-item" href="#">Nhật ký người dùng</a></li>

      </ul>
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
  