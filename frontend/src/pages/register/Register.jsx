import {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'

import './register.scss'



const Register=()=> {
  
  //First 'name' is variable and next 'setname' is what changes the function
  const[Username, setUsername]= useState('');
  const[email, setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[name, setName]=useState('');
  const[redirect, setRedirect] = useState(false);

  const submit=async(event)=>{  //the function is made asynchronous
    event.preventDefault(); //prevent default reloading of the page

    //send a request to backend for registering the user
    await fetch('http://127.0.0.1:8000/api/register',{
      method:'POST',  //this is a post request(post and get requests)
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        Username, //U in username is capitalized to prevent confusion as email is stored as username (for login ) in the database
        email,
        password,
        name
      })
    } );
    //once registered, you can set the redirect to true
    setRedirect(true); 
  }
      //once registered users should be redirected to login
      if(redirect){
        return <Navigate to = "/login"/>
      }

  return (
    <div className='register'>
      <div className='card'>
      <div className='left'>
        <h1>Register</h1>
        <form onSubmit={submit}>
          <input type='text'placeholder='Username' 
          onChange={e=>setUsername(e.target.value)} //event listener
          />
          
          <input type='text' placeholder='Email' 
            onChange={e=>setEmail(e.target.value)} //event listener
          />
          <input type='password' placeholder='Password'
            onChange={e=>setPassword(e.target.value)} //event listener
          />
          <input type='text' placeholder='Full-Name' 
            onChange={e=>setName(e.target.value)} //event listener
          />
          <button type="submit">Register</button>
        </form>
     
      </div>
      <div className='right'>
      <h1>Find Your Companion</h1>
      <p>Find people having similar
                    interests as yourself and build connections.
                    Explore the feeling of being able to talk 
                    to someone who shares the same interests as you.  
      </p>
      <span>Already have an account?</span>
      
      <Link to ='/login'>
      <button style={{cursor:'pointer'}}>Login</button>
      </Link>
      </div>
      </div>
    </div>
  )
}

export default Register
