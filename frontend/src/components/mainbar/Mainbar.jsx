import React from 'react-dom'
import { MdAccountCircle } from "react-icons/md";
import {MdDashboard} from "react-icons/md";
import {MdHome} from "react-icons/md";
import {MdDarkMode} from "react-icons/md";
import {MdSearch} from "react-icons/md";
import Addpost from '../../components/addpost/Addpost';
import {MdCircleNotifications} from "react-icons/md";
import { Link } from 'react-router-dom';
import {MdChat} from "react-icons/md";
import './mainbar.scss'
import {MdLogout} from "react-icons/md";
import { useState } from 'react';
import { useEffect } from 'react';
//import {IconContext} from "react-icons";
const Mainbar = () => {
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const content = await response.json();
      setId(content.id);
    };

    fetchUser();
  }, []); // Add an empty dependency array here

  const logout = async () => {
    await fetch('http://127.0.0.1:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
  };

  return (
    <div className='mainbar'>
      
    <div className='left'>
      <Link to='/home' style={{textDecoration:"none"}}>
        <span>Companion</span>
      </Link>
      <Link to = '/home' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdHome size={28} color='black'/>
      </Link>
      <Link to = '/home' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdDashboard size={28} color='black'/>
      </Link>
      <div className='search'>
      <Link to = '/home' style={{textDecoration:"none", cursor:'pointer'}}>
        <MdSearch size={28} color='black'/>
      </Link>
      <input type='text' placeholder='search'></input>
      {/* <Addpost/> */}
      </div>
      
    </div>
    <div className='right'>
    
    <Link to = '/profile/{id}' style={{textDecoration: "none", cursor:'pointer'}}>
      <MdAccountCircle size={28} color='black'/>
    </Link>

    <Link to = '/home' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdDarkMode size={28} color='black'/>
    </Link>
    <Link to = '/chat' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdChat size={28} color='black'/>
    </Link>
    <Link to = '/notifications' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdCircleNotifications size={28} color='black'/>
    </Link>
    <Link to = '/login' style={{textDecoration:"none", cursor:'pointer'}} onClick={logout} > 
      <MdLogout size={28} color='black'/>
    </Link>
      <div className='user'>
      
      </div>
      
    </div>
    </div>
  )
}

export default Mainbar
