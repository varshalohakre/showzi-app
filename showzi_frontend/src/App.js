// import React from 'react';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { Routes, Route } from 'react-router-dom';

// import Login from './components/Login';
// import Home from './container/Home';

// const App = () => {
//   return (
//     <GoogleOAuthProvider clientId="979315982180-vfnp18i4m7vkr5nfa9k9jpr8kr77mt6b.apps.googleusercontent.com">
//       <Routes>
//         <Route path="login" element={<Login />} />
//         <Route path="/*" element={<Home />} />
//       </Routes>
//     </GoogleOAuthProvider>
//   );
// };

// export default App;


import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Home from './container/Home';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  
  // Check if user exists and is valid JSON
  if (!user || user === 'undefined') {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  try {
    JSON.parse(user);
    return children;
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId="979315982180-vfnp18i4m7vkr5nfa9k9jpr8kr77mt6b.apps.googleusercontent.com">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;