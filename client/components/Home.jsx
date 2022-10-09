import React,{useState} from "react";
import { useNavigate } from 'react-router';
import '../App.css';




export default function Home ({user, setUser, joinTable}) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (user.tableID > 0) {
      joinTable(user);
      navigate(`/Table`);
    } else {
      alert('Please enter a valid table ID greater than 0.');
    }
  }

  const generateUID = () => {
    let UID = Math.ceil(Math.random()*1000000000)
    setUser({...user, tableID: UID});
  }

  return (
    <>
    <section className="antialiased bg-gradient-to-br from-green-100 to-white">
    <div className="container px-6 mx-auto">
      <div
        className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
      >
        <div className="flex flex-col w-full">
          <div>
          </div>
          <h1 className="text-5xl text-gray-800 font-bold">BitePay</h1>
          <p className="w-5/12 mx-auto md:mx-0 text-gray-500">
            Only pay for what you bit
          </p>
        </div>
        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
              Join!
            </h2>
            <form action="" className="w-full">
              <div id="input" className="flex flex-col w-full my-5">
                <label htmlFor="username" className="text-gray-500 mb-2"
                  >Username</label
                >
                <input
                  type="text"
                  id="username"
                  placeholder="Have your mates recognize you"
                  className="appearance-none border-2 border-gray-100 rounded-lg text-xs px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  required
                />
              </div>
              <div id="input" className="flex flex-col w-full my-5">
                <label htmlFor="password" className="text-gray-500 mb-2">Table</label>
                <input
                  type="number"
                  id="table-name"
                  placeholder="Enter party's table ID, or generate one"
                  className="appearance-none border-2 text-xs border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  value={user.tableID > 0 ? user.tableID : ''}
                  onChange={(e) => setUser({...user, tableID: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div id="button" className="flex flex-col w-full my-5">
                <button
                  type="button"
                  className="w-full py-4 mb-2 bg-green-600 rounded-lg text-green-100"
                  onClick={() => handleSubmit()}
                >
                  <div className="flex flex-row items-center justify-center">
                    <div className="mr-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-bold">Join Table</div>
                  </div>
                </button>
                <button
                  type="button"
                  className="w-full py-4 bg-green-600 rounded-lg text-green-100"
                  onClick={() => generateUID()}
                >
                  <div className="flex flex-row items-center justify-center">
                    <div className="mr-2">
                    </div>
                    <div className="font-bold">Generate New Table ID!</div>
                  </div>
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
)}
