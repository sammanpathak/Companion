import { Link } from "react-router-dom";
import Mainbar from "../../components/mainbar/Mainbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./notifications.scss";

function Notifications(){
    return (
        <div className="notification">
            <div className="mainbar">
            <Mainbar/>
            </div>
            <div className="leftbar">
            <Leftbar/>
            </div>
            
            <div className="rightbar">
                <Rightbar/>
            </div>
            {/* <div className="content">
            <h2>This is the notification page</h2>
            </div> */}
            
        </div>
    );
}

export default Notifications