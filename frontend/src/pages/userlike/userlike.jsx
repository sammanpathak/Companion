import { Link } from "react-router-dom";
import Mainbar from "../../components/mainbar/Mainbar";
import './userlike.scss';

function Userlike(){
    return (
        <div className="companions">
            <Mainbar/>
            
            <div className="contents">
                <h2>Here, you can find the list of your interests.</h2>
            </div>
        </div>
        

    );
}
export default Userlike