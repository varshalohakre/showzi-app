// import React, { useEffect, useState } from 'react';
// import { AiOutlineLogout } from 'react-icons/ai';
// import { useParams, useNavigate } from 'react-router-dom';
// import { googleLogout } from '@react-oauth/google';

// import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utlis/data';
// import { client } from '../client';
// import MasonryLayout from './MasonryLayout';
// import Spinner from './Spinner';

// const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
// const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

// const UserProfile = () => {
//   const [user, setUser] = useState();
//   const [pins, setPins] = useState();
//   const [text, setText] = useState('Created');
//   const [activeBtn, setActiveBtn] = useState('created');
//   const navigate = useNavigate();
//   const { userId } = useParams();

//   const User = localStorage.getItem('user') !== 'undefined'
//     ? JSON.parse(localStorage.getItem('user'))
//     : (localStorage.clear(), null);

//   useEffect(() => {
//     const query = userQuery(userId);
//     client.fetch(query).then((data) => {
//       setUser(data[0]);
//     });
//   }, [userId]);

//   useEffect(() => {
//     if (text === 'Created') {
//       const createdPinsQuery = userCreatedPinsQuery(userId);
//       client.fetch(createdPinsQuery).then((data) => {
//         setPins(data);
//       });
//     } else {
//       const savedPinsQuery = userSavedPinsQuery(userId);
//       client.fetch(savedPinsQuery).then((data) => {
//         setPins(data);
//       });
//     }
//   }, [text, userId]);

//   const logout = () => {
//     googleLogout(); // <-- Proper use of logout function
//     localStorage.clear();
//     navigate('/login');
//   };

//   if (!user) return <Spinner message="Loading profile" />;

//   return (
//     <div className="relative pb-2 h-full justify-center items-center">
//       <div className="flex flex-col pb-5">
//         <div className="relative flex flex-col mb-7">
//           <div className="flex flex-col justify-center items-center">
//             <img
//               className="w-full h-370 2xl:h-510 shadow-lg object-cover"
//               src="https://source.unsplash.com/1600x900/?nature,photography,technology"
//               alt="cover-pic"
//             />
//             <img
//               className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
//               src={user.image}
//               alt="user-pic"
//             />
//           </div>
//           <h1 className="font-bold text-3xl text-center mt-3">
//             {user.userName}
//           </h1>
//           {userId === User?.googleId && (
//             <div className="absolute top-0 z-1 right-0 p-2">
//               <button
//                 type="button"
//                 className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
//                 onClick={logout}
//               >
//                 <AiOutlineLogout color="red" fontSize={21} />
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="text-center mb-7">
//           <button
//             type="button"
//             onClick={(e) => {
//               setText(e.target.textContent);
//               setActiveBtn('created');
//             }}
//             className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
//           >
//             Created
//           </button>
//           <button
//             type="button"
//             onClick={(e) => {
//               setText(e.target.textContent);
//               setActiveBtn('saved');
//             }}
//             className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
//           >
//             Saved
//           </button>
//         </div>

//         <div className="px-2">
//           <MasonryLayout pins={pins} />
//         </div>

//         {pins?.length === 0 && (
//           <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
//             No Pins Found!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utlis/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  // Get current logged-in user
  const getCurrentUser = () => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored || stored === 'undefined') {
        return null;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing user:', error);
      return null;
    }
  };

  const currentUser = getCurrentUser();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    try {
      googleLogout();
      localStorage.clear();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      navigate('/login', { replace: true });
    }
  };

  if (!user) return <Spinner message="Loading profile" />;

  // Check if viewing own profile
  const isOwnProfile = userId === currentUser?.sub;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="cover-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          
          {/* Logout button - only show on own profile */}
          {isOwnProfile && (
            <div className="absolute top-0 z-1 right-0 p-2">
              <button
                type="button"
                className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md hover:bg-red-50 transition-colors"
                onClick={() => setShowLogoutConfirm(true)}
                title="Logout"
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            </div>
          )}

          {/* Logout Confirmation Modal */}
          {showLogoutConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;