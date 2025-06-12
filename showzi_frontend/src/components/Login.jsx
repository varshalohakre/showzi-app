import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import sharevideo from '../assets/share.mp4';
import logo from '../assets/logo.png';
import { jwtDecode } from 'jwt-decode';
 // make sure to install it
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (credentialResponse) => {
    try {
        const decoded = jwtDecode(credentialResponse.credential);

      localStorage.setItem('user', JSON.stringify(decoded));

      const { name, sub, picture } = decoded;

      const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
      };

      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={sharevideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-30">
          <div className="p-5">
            <img src={logo} width="350px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
