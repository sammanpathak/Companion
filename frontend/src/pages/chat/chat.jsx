import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import Mainbar from "../../components/mainbar/Mainbar";
import './chat.scss';

const Chat = () => {
  const { userCredentials } = useContext(UserContext);

  return (
    <div className="chatpage">
      <div className="mainbar">
        <Mainbar/>
      </div>
      <div className="chat" style={{ height: 'calc(100vh - 100px)', width: "100vw" }}>
        <PrettyChatWindow
          projectId='9674b492-59ef-497f-8cad-bbc7dcec9439'
          username={userCredentials.username}
          secret={userCredentials.password}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Chat;