import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Axios } from '../../Axios/users'


function WalletModal({ isOpen, onclose }) {

    const userInfo = useSelector((state) => state.user.user)
    const [amount, setAmount] = useState(null)

    useEffect(() => {
        Axios.get(`/userWallet/${userInfo._id}`).then((response) => {
            if (response) {
                setAmount(response.data)
            }
        }).catch((error) => {
            console.log("error", error)
        })
    }, [])

    return (
        <div>

            <div className={`modal ${isOpen ? 'is-active' : ''}`} >
                <div className="modal-content   rounded-lg overflow-hidden p-12 max-w-3xl mx-auto text-start">
                    <section className="modal-body">
                        <img className="w-auto h-36 object-fill rounded-full " src="/walletpic.png" alt="Icon" />
                        <div className="bg-[#c65547] rounded-md p-1 text-center text-gray-50">
                            Rs. {amount}
                        </div>
                    </section>
                    <footer className="modal-footer border-t pt-4 mt-4 flex flex-col sm:flex-row sm:justify-between">
                        {/* <button onClick={submitHandler} className="button block w-full bg-[#E38569] hover:bg-[#e07757] text-white font-semibold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">Submit</button> */}
                        <button className="authbtn block w-full" onClick={() => onclose(false)}>close</button>
                    </footer>
                </div>
            </div>

        </div>
    )
}

export default WalletModal
