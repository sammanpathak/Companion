import React,{useEffect, useState} from 'react';
import './home.scss';
import Addpost from '../../components/addpost/Addpost';
import Posts from '../../components/posts/Posts';
const Home=()=> {
    
      //For getting the name of the user,
      const [name, setName]=useState('');
      //For calling the backend
      useEffect(()=>{
        //it does not support async functions, we have to call it differently
        (
          async()=>{
            //send a request to backend for the detail of the user
        const response = await fetch('http://127.0.0.1:8000/api/user',{
          //this is a get request(by default it is get)
          headers: {'Content-Type':'application/json'},
          //for getting cookies for verification,
          credentials:'include',
    
    
        } );
        //the contents of the user
          const content = await response.json();
    
          setName(content.name) //the name of the user
          }
        )();
      });
  return (
    <div className='home'>
      <div className='add'><Addpost/></div>
      <div className='post'><Posts/></div>
      
    </div>
  )
}

export default Home
