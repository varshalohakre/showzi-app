import React from 'react';
import { googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './container/Home';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="979315982180-vfnp18i4m7vkr5nfa9k9jpr8kr77mt6b.apps.googleusercontent.com">
     
      
      <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="/*" element={<Home/>}/>
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;