import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/logo.png';
import { categories } from '../utlis/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user, userInfo }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  // Debug logging
  console.log('=== SIDEBAR DEBUG ===');
  console.log('user:', user);
  console.log('userInfo:', userInfo);
  console.log('userInfo?.picture:', userInfo?.picture);
  console.log('==================');

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
          {categories.map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.image ? (
                <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" alt={category.name} />
              ) : (
                <IoIosArrowForward />
              )}
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      
      {/* User profile section - Show when userInfo exists */}
      {userInfo && (
        <div className="flex-shrink-0 mt-auto">
          <Link
            to={`/user-profile/${userInfo.sub || 'default'}`}
            className="flex my-3 gap-2 p-3 items-center bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm mx-3 transition-colors duration-200"
            onClick={handleCloseSidebar}
          >
            <div className="flex-shrink-0">
              <img 
                src={userInfo.picture} 
                alt="user-profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  console.log('Image load error for:', userInfo.picture);
                  e.target.src = 'https://via.placeholder.com/40x40/cccccc/666666?text=' + (userInfo.name?.[0] || 'U');
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {userInfo.name || userInfo.given_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userInfo.email}
              </p>
            </div>
            <IoIosArrowForward className="text-gray-400 flex-shrink-0" />
          </Link>
        </div>
      )}

    
    </div>
  );
};

export default Sidebar;