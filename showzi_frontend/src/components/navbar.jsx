import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { googleLogout } from "@react-oauth/google";

const Navbar = ({ SearchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  // const handleLogout = () => {
  //   googleLogout();
  //   localStorage.clear();
  //   navigate("/login"); // Redirect to login page after logout
  //   // Reload the page after logout
  // };

  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleCreatePinRoute = () => {
    navigate("/create-pin");
  };

  const handleUserRoute = () => {
    navigate(`/user-profile/${user?._id}`)
    setShowDropdown((prev) => !prev)
  };

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />

        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={SearchTerm}
          onFocus={() => navigate("/Search")}
          className="p-2 w-full bg-white outline-none"
        />
        <div className="flex gap-3 items-center justify-center">

          <button onClick={handleUserRoute} className="hidden md:block">
            <img
              src={user?.image}
              alt="user"
              className="w-14 h-12 rounded-lg"
            />
          </button>
          {/* {showDropdown && (
            <div className="absolute  top-16 right-28 mt-2 w-30 bg-white shadow-lg rounded-lg z-20">
              <button
                className="w-full text-center px-4 py-2 text-gray-700 hover:bg-red-100 "
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )} */}
          
          <button
            onClick={handleCreatePinRoute}
            className="bg-black text-white rounded-lg w-12 h-12 md-14 md:h-12 flex justify-center  items-center"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
