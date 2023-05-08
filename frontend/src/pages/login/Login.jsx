import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './login.scss';


const Login=()=>{

    const[email, setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');


    //For submitting the form,
    const submit=async(event)=>{
        event.preventDefault(); //prevent default reloading of the page on submission, because it has to wait for the backend's response

    //send a request to backend for registering the user
    const response = await fetch('http://127.0.0.1:8000/api/login',{
        method:'POST',  //this is a post request(post and get requests)
        headers: {'Content-Type':'application/json'},
        //for getting cookies for verification,
        credentials:'include',
        body: JSON.stringify({
          email,
          password
        })

      } );

      const data = await response.json();
      if (response.status === 200) {
        setRedirect(true);
      } else {
        setError('Error: Incorrect email or password');

      }
    }
    return(
    <div className='login'>
        <div className="card">
            <div className="left">
                <h1>Find Your Companion</h1>
                <p>Find people having similar
                    interests as yourself and build connections.
                    Explore the feeling of being able to talk 
                    to someone who shares the same interests as you.  
                </p>
                <span>Don't have an account?</span>
                <Link to ='/register'>
                <button>Register</button>
                </Link>  
            </div>
            <div className="right">
                <h1>Login</h1>
                <form onSubmit={submit}>
                    <input type='text' placeholder='Username or Email Id'
                    onChange={e=>setEmail(e.target.value)} //event listener
                    />
                    <input type='password' placeholder='Password'
                    onChange={e=>setPassword(e.target.value)} //event listener
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p>{error}</p>}
                {redirect && <Navigate to="/home" />}
            </div>
        </div>
    
    </div>
    );
}
export default Login;