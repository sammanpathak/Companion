import { Link } from "react-router-dom";
import Mainbar from "../../components/mainbar/Mainbar";
import Leftbar from "../../components/leftbar/Leftbar";
import './chat.scss';


function Chat(){
    return(
        <div className="chat">
            <div className="mainbar">
                <Mainbar/>
            </div>
            <div className="leftbar">
                <Leftbar/>
            </div>
                {/* <div className="contents">
                <h2 style={{textAlign:'center'}}>You can chat here</h2>
                </div> */}
            
            
        </div>
    );
}

export default Chat