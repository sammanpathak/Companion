import React from 'react';
import { Outlet, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { UserProvider } from './UserContext';
import Interests from './pages/interests/Interest';
import Login from './pages/login/Login';
import Logout from './pages/logout/logout';
import Register from './pages/register/Register';
import Mainbar from './components/mainbar/Mainbar';
import Leftbar from './components/leftbar/Leftbar';
import Rightbar from './components/rightbar/Rightbar';
import Home from './pages/home/Home'
import Companions from './pages/companions/companions';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/chat';
import Notifications from './pages/notifications/notifications'
import UserProfile from './pages/profilerecommend/profilerecommend'
import './styles.scss';

function App() {
  const currentUser = true;

  const Layout = () => {
    return (
      <div>
        <Mainbar />
        <div style={{ display: 'flex' }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const routes = [
    {
      path: '/',
      element: <Register />,
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
        {
          path: '/userprofile/:id',
          element: <UserProfile />,
        },
      ],
    },
    {
      path: '/interest',
      element: <Interests />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/chat',
      element: <Chat />,
    },
    {
      path: '/notifications',
      element: <Notifications />,
    },
    {
      path: '/companions',
      element: <Companions />,
    },
  ];

  return (
    <div className="App">
      <UserProvider>
        <Router history={createBrowserHistory()}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              >
                {route.children && route.children.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
