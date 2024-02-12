import React from 'react'

function Table({ array }) {
    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Email</th>
                                        <th scope="col" className="px-6 py-4">PhoneNumber</th>
                                        <th scope="col" className="px-6 py-4">Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        array.map((user, index) => (
                                            <tr key={index}
                                                className="border-b transition duration-300 ease-in-out   dark:hover:bg-[#DCE2B7]">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{user.name}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{user.phoneNumber}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{user.gender}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Table