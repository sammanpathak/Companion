import './profilerecommend.scss'
// import Bio from '../../components/bio/Bio';
// import { useState, useEffect } from 'react';
//import {MdLocationPin} from 'react-icons/md';
import {MdAppShortcut} from 'react-icons/md';
//import Interest from '../interests/Interest';
import Posts from '../../components/posts/Posts';
import {MdOutlineFacebook} from 'react-icons/md';
//import {MdFiberManualRecord} from 'react-icons/md';

import ProfilePic from '../../assets/profile1.png'
import Cover from '../../assets/cover1.png'
import {MdMail} from 'react-icons/md';
import {MdOutlineMore} from 'react-icons/md';
import { useLocation } from 'react-router-dom';
const UserProfile = () => {
  // mapping of interest names to IDs
  // const interestMap = {
  //   Movies: 1,
  //   Stoicism: 2,
  //   Tech: 3,
  //   Music: 4,
  //   Travel: 5,
  //   Literature: 6,
  //   Football: 7,
  //   Cricket: 8,
  //   Psychology: 9,
  //   'Current Affairs': 10,
  //   Politics: 11,
  //   'Cognitive Science': 12,
  // };

  //For getting the name of the user,
//   const [Username, setName] = useState('');
//   const [bio, setBio] = useState('');
//   const [interests, setInterests] = useState([]);

//   //For calling the backend
//   useEffect(() => {
//     //it does not support async functions, we have to call it differently
//     (async () => {
//       //send a request to backend for the detail of the user
//       const response = await fetch('http://127.0.0.1:8000/api/user', {
//         //this is a get request(by default it is get)
//         headers: { 'Content-Type': 'application/json' },
//         //for getting cookies for verification,
//         credentials: 'include',
//       });
//       //the contents of the user
//       const content = await response.json();

//       setInterests(Object.values(content.interest)); //set the interests array
//       setName(content.Username); //the name of the user
//       setBio(content.bio); //the bio of the user
//     })();
//   }, []);



  // const { id } = useParams();
  const location = useLocation();
  const { username, bio, interest } = location.state || {};
//   console.log(username);
//   console.log(bio);
//   console.log(interest);


  return (
    <div className="profile">
      <div className="images">
        <img src={Cover} alt="" className="coverPic"></img>
        <img src={ProfilePic} alt="" className="profilePic"></img>
      </div>
      <div className="bio">
        <p>{bio}</p>
      </div>
      <div className="profileContainer">
        <div className="uinfo">
          <div className="left">
            <a href="https://facebook.com">
              <MdOutlineFacebook fontSize="large" />
            </a>
            <a href="https://twitter.com">
              <MdAppShortcut />
            </a>
          </div>
          <div className="center">
            {/* to display username from databse */}
            <span>{username}</span>
            <div className="info">
              <div className="interest">
                {/* create dynamic divs */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
  {interest && interest.map((interests, index) => (
    <div key={index} style={{ padding: '10px', margin: '10px', backgroundColor: '#f0f0f0' }}>
      {interests}
    </div>
  ))}
</div>
              </div>
              <div className="button">
                <button>Connect</button>
              </div>
            </div>
          </div>
          <div className="right">
            <MdMail />
            <MdOutlineMore />
          </div>
        </div>
      </div>
      <div className="posts">
        <Posts />
      </div>
    </div>
  );
};

export default UserProfile;
