import { Link } from 'react-router-dom';
import './landing.scss';

const Landing=()=>{
    return(
    <div className='Index'>
        

            <h1>MEET PEOPLE SHARING YOUR INTERESTS</h1>
            <br />
            <h3>Chat Anonymously</h3>

                <div className="middle">
                    <div className="login">
                    <span>Already Have an Account? </span>
                    <br />
                    <Link to = "/login">
                        <button>Login</button>
                    </Link>
                    </div>
                    
                    <div className="register">
                    <span>Don't Have an Acccount?</span>
                    <br />
                    <Link to ='/register'>
                    <button>Register</button>
                    </Link>  
                    </div>
                </div>
    </div>
    );
}
export default Landing;