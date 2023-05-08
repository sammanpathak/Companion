import React from 'react'
import './leftbar.scss'
import { Link } from 'react-router-dom';
// import {MdOutlinePersonPin} from "react-icons/md";
// import {MdGroups} from "react-icons/md";
// import {MdOutlinePersonSearch} from "react-icons/md";
// import {MdOutlineChatBubbleOutline} from "react-icons/md";
// import {MdOutlinePersonAdd} from "react-icons/md";
// import {MdInterests} from "react-icons/md";
// import {} from "react-icons/md";
import suggestion from '../../assets/suggestion.png';
import find from '../../assets/findcom.png'
import StartAConvo from '../../assets/startaconvo.png';
import homeIcon from '../../assets/home.png';
import Interest from '../../assets/postbasedonint.png';
import Companions from '../../assets/companions.png';

function Leftbar() {
  return (
    <div className='leftbar' style={{display:'flex'}}>
     <div className="container">
     <div className="user">
        <Link to ='/profile' style={{textDecoration:"none", cursor:'pointer' }}>
          <img alt='MT' src='data:image/jpeg;base64,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'></img>
          <span>Mike Tyson</span>
        </Link>
      </div>
      <div className="homeIcon">
          <Link to = '/home' style={{textDecoration:"none", cursor:'pointer'}}>
          <img src={homeIcon} alt=''></img>
          <span>Home</span>
          </Link>
        </div>
      
        <div className="suggestion">
          <Link to = "/companions" style={{textDecoration:"none", cursor:'pointer'}}>
          <img src={Companions} alt=''></img>
          <span>Companions</span>
          </Link>
        </div>
      <div className="find">
        <Link to = "/find" style={{textDecoration:'none', cursor:'pointer'}}>
        <img src={find} alt=''></img>
        <span>Find</span>
        </Link>
        </div>
        <div className="interest">
          <Link to = "/userlike" style={{textDecoration:"none", cursor:'pointer'}}>
          <img src={Interest} alt=''></img>
          <span>You may like</span>
          </Link>
        </div>
        <div className="startAConvo">
          <Link to = "/chat" style={{textDecoration: "none", cursor:'pointer'}}>
          <img src={StartAConvo} alt=''></img>
          <span>Start a chat</span>
          </Link>
        </div>
        
        <div className="suggestion">
          <Link to = "/suggestion" style={{textDecoration: "none", cursor:'pointer'}}>
          <img src={suggestion} alt=''></img>
          <span>Suggestions</span>
          </Link>
        </div>
      
      {/* <MdOutlinePersonPin/>
      <MdGroups/>
      <MdOutlinePersonSearch/>
      <MdOutlineChatBubbleOutline/>
      <MdOutlinePersonAdd/>
      <MdInterests/> */}
    </div>
    </div> 
  )
}

export default Leftbar
