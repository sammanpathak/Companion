import React from 'react-dom'
import { MdAccountCircle } from "react-icons/md";
import {MdDashboard} from "react-icons/md";
import {MdHome} from "react-icons/md";
import {MdDarkMode} from "react-icons/md";
import {MdSearch} from "react-icons/md";
import {MdCircleNotifications} from "react-icons/md";
import { Link } from 'react-router-dom';
import {MdChat} from "react-icons/md";
import './mainbar.scss'
import {MdLogout} from "react-icons/md";
//import {IconContext} from "react-icons";
const Mainbar=()=> {

  const logout =async()=>{
    //when this request is sent, the cookie will be cleared
    await fetch('http://127.0.0.1:8000/api/logout',{
      method:'POST',  //this is a post request(post and get requests)
      headers: {'Content-Type':'application/json'},
      //for getting cookies for verification,
      credentials:'include',
    } );
  }

  return (
    <div className='mainbar'>
      
    <div className='left'>
      <Link to='/' style={{textDecoration:"none"}}>
        <span>Companion</span>
      </Link>
      <Link to = '/' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdHome size={28}/>
      </Link>
      <Link to = '/' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdDashboard size={28}/>
      </Link>
      <div className='search'>
      <Link to = '/' style={{textDecoration:"none", cursor:'pointer'}}>
        <MdSearch size={28}/>
      </Link>
      <input type='text' placeholder='search'></input>
      </div>
      
    </div>
    <div className='right'>
    
    <Link to = '/profile/:id' style={{textDecoration: "none", cursor:'pointer'}}>
      <MdAccountCircle size={28}/>
    </Link>

    <Link to = '/home' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdDarkMode size={28}/>
    </Link>
    <Link to = '/chat' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdChat size={28}/>
    </Link>
    <Link to = '/notifications' style={{textDecoration:"none", cursor:'pointer'}}>
      <MdCircleNotifications size={28}/>
    </Link>
    <Link to = '/login' style={{textDecoration:"none", cursor:'pointer'}} onClick={logout} > 
      <MdLogout size={28}/>
    </Link>
      <div className='user'>
      
      </div>
      
    </div>
    </div>
  )
}

export default Mainbar
