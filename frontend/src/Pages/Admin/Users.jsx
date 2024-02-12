import React from 'react'

function Users() {
  return (
    <div>
       <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold">Admin Panel</span>
        </div>
        <div>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 flex flex-col">
          {/* <div className="p-4">
            <a href="#" className="text-2xl font-bold">Admin Panel</a>
          </div> */}
          <nav className="flex-1 flex flex-col">
            <a href="#" className="p-4 hover:bg-gray-700">Users</a>
            <a href="#" className="p-4 hover:bg-gray-700">Products</a>
            <a href="#" className="p-4 hover:bg-gray-700">Payments</a>
            <a href="#" className="p-4 hover:bg-gray-700">Doctors</a>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {/* Your content goes here */}
          <h2 className="text-3xl font-bold">Welcome to the Admin Panel</h2>
          <p>This is where your Users, Products, Payments, and Doctors content will appear.</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Users
