
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProfileBar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="mx-0 sm:mx-5 sm:py-3 sm:px-3 border-b grid grid-cols-2 border-gray-300">
                <div className="flex items-center">
                    <img className="sm:w-52 w-40" src="/take-care-logo.png" alt="Icon" />
                </div>
                <div className="hidden sm:grid grid-cols-4 items-center">
                    <div className="div"><Link to="/">Home</Link></div>
                    <div className="div"><Link>Tips</Link></div>
                    <div className="div"><Link>No</Link></div>
                    <div className="div">
                        <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/profile')} >
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
                <div className="sm:hidden flex flex-col ">
                    <div className=" hover:bg-[#DFEBE9] p-2">Home</div>
                    <div className="hover:bg-[#DFEBE9] p-2">Tips</div>
                    <div className="hover:bg-[#DFEBE9] p-2">no</div>
                    <div className="hover:bg-[#DFEBE9] p-2">
                        <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/login')}>
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileBar;

