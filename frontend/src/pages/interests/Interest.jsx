import './interest.scss'
import React from 'react'
import Interest from '../../components/interest/Interest.jsx'

function Interests() {
  return (
    
    <div className='interests'>
            <div className="title"><h1>Choose 2-6 interests</h1></div>
            <div className="interest">
                <Interest/>
            </div>
        </div>
      
  )
}

export default Interests