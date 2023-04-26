  import React from 'react';
  import './css/Sidebar.css';
  import logoAlta from '../assets/logo.png';
  import {MdOutlineDashboard} from 'react-icons/md';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faDesktop } from '@fortawesome/free-solid-svg-icons';
  
  const Navbar:React.FC = () => {
    
    return (
      <div>
 <div className="d-flex flex-column flex-shrink-0 p-3 " >
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg className="bi me-2" width="40" height="32"></svg>
      <span className="fs-4">
        <img className='logomain' src={logoAlta}/>
      </span>
    </a>
    
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <a href="#" className="nav-link link-dark " aria-current="page">
          <MdOutlineDashboard/>
          <svg className="bi me-2 " width="16" height="16"></svg>
         
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
        <FontAwesomeIcon icon={faDesktop} />
          <svg className="bi me-2" width="16" height="16"></svg>
          
          Thiết bị  
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
          <svg className="bi me-2" width="16" height="16"></svg>
          Dịch vụ
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
          <svg className="bi me-2" width="16" height="16"></svg>
          Cấp số 
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
          <svg className="bi me-2" width="16" height="16"></svg>
          Báo cáo
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-dark">
          <svg className="bi me-2" width="16" height="16"></svg>
          Cài đặt hệ thống 
        </a>
      </li>
    </ul>
   
    {/* <div className="dropdown">
      <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
        <strong>mdo</strong>
      </a>
      <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><a className="dropdown-item" href="#">New project...</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div> */}
  </div>
      </div>
      
    )
  }
  
  export default Navbar
  