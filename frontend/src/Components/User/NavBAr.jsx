
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userInfo = useSelector((state) => state.user.user)

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div>
      <div className="mx-0 sm:mx-5 sm:py-3 sm:px-3 border-b grid grid-cols-2 border-gray-300">
        <div className="flex items-center hover:cursor-pointer" >
          <img className="sm:w-52 w-40" src="/take-care-logo.png" alt="Icon" />
        </div>
        <div className="hidden sm:grid grid-cols-4 items-center">
          <div ><Link to="/" className="hover-smooth">Home</Link></div>
          <div ><Link to="/health_tips" className="hover-smooth">Tips</Link></div>
          <div ><Link to="/about" className="hover-smooth">About</Link></div>
          <div >
            {userInfo ? (
              <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/profile')} >
                Profile
              </button>
            ) : (
              <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/login')}>
                Login
              </button>
            )}

          </div>
        </div>

        <div className="flex items-center sm:hidden justify-end">
          <button className="text-gray-600" onClick={handleToggleMenu}>
            ☰
          </button>
        </div>

      </div>

      {isMenuOpen && (
        <div className="sm:hidden flex flex-col ">
          <div className=" hover:bg-[#DFEBE9] p-2"><Link to="/">Home</Link></div>
          <div className="hover:bg-[#DFEBE9] p-2"><Link to="/health_tips">Tips</Link></div>
          <div className="hover:bg-[#DFEBE9] p-2"><Link to="/about">About</Link></div>
          <div className="hover:bg-[#DFEBE9] p-2">
            {
              userInfo ? (
                <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/profile')} >
                  Profile
                </button>
              ) : (
                <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/login')}>
                  Login
                </button>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;

