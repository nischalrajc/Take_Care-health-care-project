// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// function NavBAr() {

//     const navigate = useNavigate()

//     return (
//         <div>

//             <div className="mx-0 sm:mx-5 sm:py-3 sm:px-3 border-b grid grid-cols-2 border-gray-300">
//                 <div className=" flex items-center">
//                     <img className="sm:w-52 w-40" src="/take-care-logo.png" alt="Icon" />
//                 </div>
//                 <div className="  flex grid grid-cols-4 items-center">
//                     <div className="div">
//                         Home
//                     </div>
//                     <div className="div">
//                         Tips
//                     </div>
//                     <div className="div">
//                         About
//                     </div>
//                     <div className="div">
//                     <button className='border border-black rounded px-3 py-1' onClick={()=>navigate('/login')}>Login</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NavBAr


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function NavBar() {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleToggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div>
//       <div className="mx-0 sm:mx-5 sm:py-3 sm:px-3 border-b grid grid-cols-2 border-gray-300">
//         <div className="flex items-center">
//           <img className="sm:w-52 w-40" src="/take-care-logo.png" alt="Icon" />
//         </div>
//         <div className="hidden sm:grid grid-cols-4 items-center">
//           <div className="div">Home</div>
//           <div className="div">Tips</div>
//           <div className="div">About</div>
//           <div className="div">
//             <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/login')}>
//               Login
//             </button>
//           </div>
//         </div>
//         <div className="flex items-center sm:hidden justify-end">
//           <button className="text-gray-600" onClick={handleToggleMenu}>
//             ☰
//           </button>
//         </div>
//         <div className={`sm:hidden grid-cols-4 items-center ${isMenuOpen ? 'grid' : 'hidden'}`}>
//           <div className="div">Home</div>
//           <div className="div">Tips</div>
//           <div className="div">About</div>
//           <div className="div">
//             <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/login')}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavBar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
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
          <div className="div">Home</div>
          <div className="div">Tips</div>
          <div className="div">About</div>
          <div className="div">
            <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/login')}>
              Login
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
          <div className="hover:bg-[#DFEBE9] p-2">About</div>
          <div className="hover:bg-[#DFEBE9] p-2">
            <button className="border border-black rounded px-3 py-1" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;

