 import React, {useState,useRef,useEffect} from 'react'
import {HiMenu } from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link,Route,Routes, useNavigate} from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import {client } from '../client';
import Pins from './pins'; // make sure ./Pins.jsx exists and exports default

import { userQuery } from '../utlis/data';
import logo from '../assets/logo.png';


const Home = () => {
  const [ToggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser]  = useState(null);
  const userInfo = localStorage.getItem('user') !== 'undefined'? JSON.parse(localStorage.getItem('user')): localStorage.clear();
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query)
    .then((data) => {
      // console.log(data[0],"userData");
      
      setUser(data[0]);
    })
  }, [userInfo?.sub]);

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  }, [])
  
  console.log(user?.image,"user state");
  

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out '>
      {/* DESKTOP SIDEBAR - FIXED: Added userInfo prop */}
       <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar 
          user={user}
        />
       
      </div>
      

      {/* MOBILE HEADER */}
      
      <div className='flex  md:hidden  flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true) }/>
          <Link to='/'>
            <img src={logo} alt="logo" className='w-28'/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-profile" className='w-9 h-9 rounded-full'/>
          </Link>
         
        </div>
        
        {/* MOBILE SIDEBAR */}
        {ToggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=>setToggleSidebar(false)}/>
            </div>
            <Sidebar 
              user={user} 
              closeToggle={setToggleSidebar}
            />
          </div>
        )}
      </div>
      
      {/* MAIN CONTENT */}
      <div className='pb-2 flex-1 h-screen overflow-y-scroll ' ref={scrollRef}>
  
        
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile/>}/>
          <Route path="/*" element={<Pins user={user}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home  


/* 
import React, {useState, useRef, useEffect} from 'react';
import {HiMenu} from 'react-icons/hi';
import {AiFillCloseCircle} from 'react-icons/ai';
import {Link, Route, Routes} from 'react-router-dom';
import {Sidebar, UserProfile} from '../components';
import {client} from '../client';
import Pins from './pins'; // Removed .jsx extension

import {userQuery} from '../utlis/data'; // Fixed typo: utlis -> utils
import logo from '../assets/logo.png';

console.log('Sidebar:', Sidebar);
console.log('typeof Sidebar:', typeof Sidebar);

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false); // Fixed camelCase
  const [user, setUser] = useState(null);
  
  // Fixed localStorage logic - this was problematic
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored && stored !== 'undefined') {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  
  const scrollRef = useRef(null);
  
  useEffect(() => {
    if (userInfo?.googleId) {
      const query = userQuery(userInfo.googleId);
      client.fetch(query)
        .then((data) => {
          setUser(data[0]);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userInfo]); // Added userInfo as dependency
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, []);
  
  console.log(user);
  console.log(user?.image);
  console.log(userInfo);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      {/* DESKTOP SIDEBAR 
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar 
          user={user}
          userInfo={userInfo}
        />
      </div>
      
      {/* MOBILE HEADER 
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu 
            fontSize={40} 
            className='cursor-pointer' 
            onClick={() => setToggleSidebar(true)}
          />
          <Link to='/'>
            <img src={logo} alt="logo" className='w-28'/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img 
              src={userInfo?.picture} 
              alt="user-profile" 
              className='w-9 h-9 rounded-full'
            />
          </Link>
        </div>
        
        {/* MOBILE SIDEBAR 
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle 
                fontSize={30} 
                className='cursor-pointer' 
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar 
              user={user}
              closeToggle={setToggleSidebar}
              userInfo={userInfo}
            />
          </div>
        )}
      </div>
      
      /* MAIN CONTENT 
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile/>}/>
          <Route path="/*" element={<Pins user={user}/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Home; */