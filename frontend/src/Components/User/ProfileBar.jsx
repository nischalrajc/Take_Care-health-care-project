import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import { Axios } from '../../Axios/users';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../Slices/userSlice';


function ProfileBar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dispatch = useDispatch()

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        Axios.get('/logout', { withCredentials: true }).then((response) => {
            if (response.data) {
                dispatch(userLogout())
                navigate('/')
            }
        })
    }

    return (
        <div>
            <div className="mx-0 sm:mx-5 sm:py-3 sm:px-3 border-b grid grid-cols-2 border-gray-300">
                <div className="flex items-center">
                    <img className="sm:w-52 w-40" src="/take-care-logo.png" alt="Icon" />
                </div>
                <div className="hidden sm:grid grid-cols-4 items-center">
                    <div className="div"><Link to="/">Home</Link></div>
                    <div className="div"><Link to='/health_tips'>Tips</Link></div>
                    <div className="mx-auto"><Link><IoIosNotifications className="text-2xl" /></Link>
                    </div>
                    <div className="div">
                        <button className="border border-black rounded px-3 py-1" onClick={handleLogout} >
                            Log out
                        </button>
                    </div>
                </div>

                <div className="flex items-center sm:hidden justify-end">
                    <button className="text-gray-600" onClick={handleToggleMenu}>
                        ☰
                    </button>
                </div>

            </div>

            {isMenuOpen && (
                <div className="sm:hidden flex flex-col">
                    <div className=" hover:bg-[#DFEBE9] p-2"><Link to="/">Home</Link></div>
                    <div className="hover:bg-[#DFEBE9] p-2"><Link to='/health_tips'>Tips</Link></div>
                    <div className="hover:bg-[#DFEBE9] p-2"><Link><IoIosNotifications /></Link></div>
                    <div className="hover:bg-[#DFEBE9] p-2">
                        <button className="border border-black rounded px-3 py-1" onClick={handleLogout}>
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileBar;

