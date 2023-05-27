import React, { useState } from 'react';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState({});

  const updateUsername = (username) => {
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      username: username,
    }));
  };

  const updatePassword = (password) => {
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: password,
    }));
  };

  const updateUserCredentials = (username, password) => {
    setUserCredentials({ username, password });
  };

  return (
    <UserContext.Provider
      value={{ userCredentials, updateUsername, updatePassword, updateUserCredentials }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
