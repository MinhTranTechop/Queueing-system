import React from 'react';
import Navbar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './css/Profile.css'
const profile:React.FC = () => {
    return (
        <div className='profle-main'>
            
            <Navbar/>
            <Topbar/>
            
        </div>
    );
};

export default profile;