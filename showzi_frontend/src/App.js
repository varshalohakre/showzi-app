import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './container/Home';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="512883960325-fm39fsngbv50q3ih93t64t6jcjjdhtrf.apps.googleusercontent.com">
      <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="/*" element={<Home/>}/>
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;