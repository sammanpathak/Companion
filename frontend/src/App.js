import Landing from "./pages/opening/landing";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/logout";
import Register from "./pages/register/Register";
import Interest from "./pages/interests/Interest";
import Mainbar from "./components/mainbar/Mainbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Companions from "./pages/companions/companions"
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/chat";
import Notifications from "./pages/notifications/notifications";
import './styles.scss'
import { Navigate } from 'react-router-dom';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {

  const currentUser=true;

  const Layout=()=>{
    return(
      <div>
        <Mainbar/>
        <div style={{display:'flex'}}>
          <Leftbar/>
          <div style={{flex:6}}>
            <Outlet/>
          {/* <Home/>  */}
          </div>
          <Rightbar/> 
        </div>
        {/* <Home/> */}
      </div>
      
    );
  }


  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to ='/login'/>
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
        <Layout/>
        </ProtectedRoute>,
      children:[{
       
        path:'/',
        element: <ProtectedRoute> <Landing/>,
        </ProtectedRoute>
    },
    {
      path:"/home",
        element:<ProtectedRoute>
          <Home/>,
        </ProtectedRoute>   
    },
    {
      path:"/profile/:id",
      element: <Profile/>,
    },
  ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/logout",
      element: <Logout/>,
    },
    {
      path:"/interest",
      element:<Interest/>
    },
    {
      path: "/chat",
      element: <Chat/>,
    },
    {
      path: "/notifications",
      element: <Notifications/>,
    },
    {
      path: "/companions",
      element: <Companions/>,
    },
  ]);

  return (
    // <div> className='theme-dark'></div>

    <div className="App">
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
