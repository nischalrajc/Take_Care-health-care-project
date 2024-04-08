import React from 'react'

function Pagination({ totalData, dataPerPage ,setCurrentPage}) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pages.push(i)
    }
    return (
        <div className="mt-10">
            {
                pages.map((page, index) => {
                    return <button className='bg-black text-white px-2 py-1 rounded mx-1' key={index} onClick={()=>setCurrentPage(page)}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination
