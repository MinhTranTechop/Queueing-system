import React from 'react';
import './css/Topbar.css';
import avata from '../assets/avata.png'
import notify from '../assets/iconNotify.png'
const Topbar : React.FC = () => {
    return (
        <div className='topbar'>
            <div className='topbar-left'>
                <button className='functionP'>Dashboard</button>
            </div>
            <div className='topbar-right'>
                <div className='notify'>
                    <img src={notify}/>
                </div>
                <div className='profile'>
                    <div className='imageP'>
                    <img src={avata}/>
                    </div>
                    <div className='nameP'>
                        <p className='xinchao'>Xin chào</p>
                        <span className='nameMain'>Lê Quỳnh Ái Vân</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar ;

