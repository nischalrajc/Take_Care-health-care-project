import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import { Axios } from '../../Axios/users';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../Slices/userSlice';
import { FaWallet } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import WalletModal from './WalletModal';

function ProfileBar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false)

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

    const showWallet = () => {
        setShowModal(true)
    }

    return (
        <div>
            <div className="mx-0 sm:mx-5 sm:py-3 sm:px-3 border-b grid grid-cols-2 border-gray-300">
                <div className="flex items-center">
                    <img className="sm:w-52 w-40" src="/take-care-logo.png" alt="Icon" />
                </div>
                <div className="hidden sm:grid grid-cols-4 items-center">
                    <div className="mx-auto"><Link to="/"><IoHome /></Link></div>
                    <div className=" mx-auto flex flex-row items-center justify-center"> < FaWallet className='ms-1 hover:cursor-pointer' onClick={showWallet} /></div>
                    <div className="mx-auto"><Link><IoIosNotifications className="text-2xl" /></Link></div>
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

            {showModal && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center">
                <div className="border border-black border-opacity-25 rounded-lg shadow-lg transition delay-700 duration-300 bg-white">
                    <WalletModal isOpen={showModal} onclose={setShowModal} />
                </div>
            </div>}

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

