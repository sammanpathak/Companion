import { Link } from "react-router-dom";
import Mainbar from "../../components/mainbar/Mainbar";
import Leftbar from "../../components/leftbar/Leftbar";
import './companions.scss';

function Companions(){
    return (
        <div className="companions">
            <Mainbar/>
            <Leftbar/>
            <div className="contents">
                <h2>Here, you can find the list of your companions</h2>
            </div>
        </div>
        

    );
}
export default Companions