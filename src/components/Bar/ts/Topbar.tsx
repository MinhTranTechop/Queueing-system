import React from 'react';
import '../css/Topbar.css';
import avata from '../../../assets/avata.png'
import Notify from './Notify';
import Profile from '../../../pages/Profile';
import { useParams ,Link   } from "react-router-dom";
const Topbar : React.FC = () => {
    const  userId  = localStorage.getItem('id'); 
    const userName = localStorage.getItem('Name_User');
    return (
        <div className='topbar'>
            <div className='topbar-left'>
                <button className='functionP'>Dashboard</button>
            </div>
            <div className='topbar-right'>
                <div className='notify'>
                    <Notify/>
                </div>
                <div className='profile'>
                    <div className='imageP'>
                  <Link to={`/profile/${userId}`}> <img src={avata}/></Link>
                    </div>
                    <div className='nameP'>
                        <p className='xinchao'>Xin chào</p>
                        <span className='nameMain'>{userName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar ;

