
import React from 'react';
import { useParams } from 'react-router-dom';
import { Axios } from '../../Axios/users';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Success() {
  const { slotId } = useParams();
  const userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // Create a ref to store whether the API call has been made
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      Axios.get(`/book_doctor?slotId=${slotId}&userId=${userInfo._id}`)
        .then((response) => {
          if (response.data) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });

      hasFetchedData.current = true;
    }
  }, [slotId, userInfo._id]);

  const handleClick = () => {
    navigate('/scheduled_appointments');
  };

  return (
    <div>
      <div className="mt-16 flex justify-center">
        <img className="max-w-64" src="/moneyTransfer.gif" alt="Icon" />
      </div>
      Payment completed successfully
      <div className="mt-6 text-white">
        <button className="bg-[#3fb5cf] px-4 py-1 rounded-md" onClick={handleClick}>
          Visit home
        </button>
      </div>
    </div>
  );
}

export default Success;
