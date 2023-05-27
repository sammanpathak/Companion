import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

import './register.scss';

const Register = () => {
  const { updateUserCredentials } = useContext(UserContext);
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const nameParts = name.split(' ');

    const userDetails = {
      Username,
      email,
      password,
      name
    };
    //send the details to the chat engine for registration
    await fetch('https://api.chatengine.io/users/', {
      method: 'POST',
      body: JSON.stringify({
        username: Username,
        secret: password,
        email: email,
        first_name: nameParts[0].trim(), // Use the first part of name as first_name
        last_name: nameParts[1] ? nameParts[1].trim() : '', // Use the second part of name as last_name if available
      }),
      headers: {
        'Content-Type': 'application/json',
        'Private-Key': '9667e56b-3d02-4a76-9553-b5dbdd0338cc',
      },
    });

    // Store the user credentials
    updateUserCredentials(Username, password);

   // Navigate to interest page and pass user details as state
   navigate('/interest', { state: { userDetails } });
  };

  return (
    <div className='register'>
      <div className='card'>
        <div className='left'>
          <h1>Register</h1>
          <form onSubmit={submit}>
            <input
              type='text'
              placeholder='Username'
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='text'
              placeholder='Full-Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type='submit'>Register</button>
          </form>
        </div>
        <div className='right'>
          <h1>Find Your Companion</h1>
          <p>
            Find people having similar interests as yourself and build
            connections. Explore the feeling of being able to talk to someone
            who shares the same interests as you.
          </p>
          <span>Already have an account?</span>

          <Link to='/login'>
            <button style={{ cursor: 'pointer' }}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
