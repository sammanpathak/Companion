import './interest.scss'
import React from 'react'
import {MdImage} from 'react-icons/md'
import {MdAddCircle} from 'react-icons/md'
//import Interest from '../../components/interest/Interest.jsx'

//const interests=['Football','Cricket','Psychology','Cognitive Science'];

function Interests() {
  return (
    <div className="all">
    <div className='interests'>

            <div className="title"><h1>Select 2-6 interests</h1></div>
            <div className="interest">
            <div className="topics">
            <div className="row1">
            {/* <div className="topic1"> */}
                <button>Movies</button>
            {/* </div> */}
            {/* <div className="topic2"> */}
                <button>Stoicism</button>
            {/* </div> */}
            {/* <div className="topic3"> */}
                <button>Tech</button>
            {/* </div> */}
            </div>
            <div className="row2">
                {/* <div className="topic1"> */}
                <button>Music</button>
            {/* </div> */}
            {/* <div className="topic2"> */}
                <button>Travel</button>
            {/* </div> */}
            {/* <div className="topic3"> */}
                <button>Literature</button>
            {/* </div> */}
            </div>
            <div className="row3">
                {/* <div className="topic1"> */}
                <button>Football</button>
            {/* </div> */}
            {/* <div className="topic2"> */}
                <button>Cricket</button>
            {/* </div> */}
            {/* <div className="topic3"> */}
                <button>Psychology</button>
            {/* </div> */}
            </div>
            
            
            <div className="row4">
                {/* <div className="topic1"> */}
                <button>Current Affairs</button>
            {/* </div> */}
            {/* <div className="topic2"> */}
                <button>Politics</button>
            {/* </div> */}
            {/* <div className="topic3"> */}
                <button>Cognitive science</button>
            {/* </div> */}
            </div>
            </div>
            
        </div>
      
    </div>   
    <div className="addBio">
        <input type="text" placeholder='Add the bio for your profile' />
    </div>
        <div className="uploadPics">
            <div className="profilePic">
                <div className="text"><p>Add your profile picture</p></div>
            <div className="icons"><MdImage size='28'/>
            <MdAddCircle size='28'/></div>
            </div>
            <div className="coverPic">
                <div className="text"><p>Add your cover picture</p></div>
            <div className="icons"><MdImage size='28'/>
            <MdAddCircle size='28'/></div>
            </div>

        </div>
        <div className='submit'>
            <button>Submit</button>
        </div>
        </div>
    
  )
}

export default Interests