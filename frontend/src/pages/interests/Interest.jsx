import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './interest.scss';
function Interests() {


    const location = useLocation();
    const [interest, setSelectedInterests] = useState([]);
    const [bio, setBio] = useState('');
    const[redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    const locationState = location.state || {};
    const { userDetails } = locationState || {};
const { email, password } = userDetails || {};


    // mapping of interest names to IDs
    const interestMap = {
      Movies: 1,
      Stoicism: 2,
      Tech: 3,
      Music: 4,
      Travel: 5,
      Literature: 6,
      Football: 7,
      Cricket: 8,
      Psychology: 9,
      'Current Affairs': 10,
      Politics: 11,
      'Cognitive Science': 12,
    };
  
    const handleInterestClick = (interestName) => {
      const interestId = interestMap[interestName];
      const selectedInterests = [...interest];
  
      // check if the interest is already selected
      const index = selectedInterests.indexOf(interestId);
      if (index > -1) {
        selectedInterests.splice(index, 1);
      } else {
        // check if maximum number of interests is already selected
        if (selectedInterests.length > 6) {
            return;
          }
        selectedInterests.push(interestId);
      }
  
      setSelectedInterests(selectedInterests);
    };
  
    const handleSubmit = async(event) => {
      
      console.log('User details:', userDetails);
      console.log('Selected interests:', interest);
      console.log('bio:', bio);
      //send a request to backend for registering the user
      const response1 = await fetch('http://127.0.0.1:8000/api/register',{
        method:'POST',  //this is a post request(post and get requests)
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          userDetails,
          interest,
          bio
        })
      });
      
      
      const data = await response1.json();
  if (response1.status === 400 && data.email) {
    setError('The email you used for registration already exists!');
  } else if (response1.status === 200) {

      //send a request to backend for login immediately after registering the user
      const response = await fetch('http://127.0.0.1:8000/api/login',{
        method:'POST',  //this is a post request(post and get requests)
        headers: {'Content-Type':'application/json'},
        //for getting cookies for verification,
        credentials:'include',
        body: JSON.stringify({
          email, 
          password,
        })
      } );
      if (response.status === 200) {
        
        setRedirect(true);
      }
    
  } 
  else {
    setError('An error occurred during registration. Please try again later.');
  }
  
    }
    return (
      <div>
        <div className="all">
          <div className="interests">
            <div className="conatiner">
            <div className="title">
              <h1>Select 2-6 interests</h1>
            </div>
            <div className="interest">
              <div className="topics">
                <div className="row1">
                  <button
                    className={interest.includes(1) ? 'active' : ''}
                    onClick={() => handleInterestClick('Movies')}
                  >
                    Movies
                  </button>
                  <button
                    className={interest.includes(2) ? 'active' : ''}
                    onClick={() => handleInterestClick('Stoicism')}
                  >
                    Stoicism
                  </button>
                  <button
                    className={interest.includes(3) ? 'active' : ''}
                    onClick={() => handleInterestClick('Tech')}
                  >
                    Tech
                  </button>
                </div>
                <div className="row2">
                  <button
                    className={interest.includes(4) ? 'active' : ''}
                    onClick={() => handleInterestClick('Music')}
                  >
                    Music
                  </button>
                  <button
                    className={interest.includes(5) ? 'active' : ''}
                    onClick={() => handleInterestClick('Travel')}
                  >
                    Travel
                  </button>
                  <button
                    className={interest.includes(6) ? 'active' : ''}
                    onClick={() => handleInterestClick('Literature')}>Literature</button>
            </div>
            <div className="row3">
            <button
                    className={interest.includes(7) ? 'active' : ''}
                    onClick={() => handleInterestClick('Football')}
                  >
                    Football
                  </button>
                  <button
                    className={interest.includes(8) ? 'active' : ''}
                    onClick={() => handleInterestClick('Cricket')}
                  >
                    Cricket
                  </button>
              

            {/* </div> */}
            {/* <div className="topic3"> */}
            <button
                    className={interest.includes(9) ? 'active' : ''}
                    onClick={() => handleInterestClick('Psychology')}
                  >
                    Psychology
                  </button>
            {/* </div> */}
            </div>
            
            
            <div className="row4">
                {/* <div className="topic1"> */}
                <button
                    className={interest.includes(10) ? 'active' : ''}
                    onClick={() => handleInterestClick('Current Affairs')}
                  >
                    Current Affairs
                  </button>
            {/* </div> */}
            {/* <div className="topic2"> */}
            <button
                    className={interest.includes(11) ? 'active' : ''}
                    onClick={() => handleInterestClick('Politics')}
                  >
                    Politics
                  </button>
            {/* </div> */}
            {/* <div className="topic3"> */}
            <button
                    className={interest.includes(12) ? 'active' : ''}
                    onClick={() => handleInterestClick('Cognitive Science')}
                  >
                    Cognitive Science
                  </button>
            </div>
            </div>
            
        </div>
      
    </div>   
    <div className="addBio">
        <input type="text" placeholder='Add the bio for your profile' value={bio}
              onChange={(e) => setBio(e.target.value)} />
    </div>
        <div className="uploadPics">
            <div className="profilePic">
                <div className="text"><p>Add your profile picture</p></div>
            <div className="icons">
            <input type="file" /></div>
            </div>
            <div className="coverPic">
                <div className="text"><p>Add your cover picture</p></div>
            <div className="icons">
            <input type="file" />
            </div>
            </div>

        </div>
        <div className='submit'>
            <button type = "submit"  onClick={handleSubmit}>Submit</button>
           
        </div>
        {error && (
  <div className="error">
    <pre>{error}</pre>
  </div>
)}
            {redirect && <Navigate to="/home" />}
        </div>
        </div>
        </div>
    
  )
}

export default Interests