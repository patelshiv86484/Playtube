import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getUserPlaylist} from "../ApiCalls/playlist.js"
import { Playlistpreview } from "../components";
const collection=()=>{
    const [playlist,setPlaylist]=useState();
    const userData=useSelector(state=>state.auth.userData)
    const navigate=useNavigate();
    useEffect(()=>{
          const fetchdata=async ()=>{
          const playlist=await getUserPlaylist(userData._id)
          setPlaylist(playlist.data)
         }
         fetchdata();
    },[])
    const addplaylist=()=>{
        navigate("/add-playlist")
    }
//     return (
//         playlist?
//     <>{
//         playlist.map(ele=>(
//        <div key={ele._id} > 
//         <Playlistpreview  playlist={ele} />
//        </div>
//         ))
// }

// <button onClick={addplaylist}> Add Playlist</button>
//     </>:
//     <h1>Loading</h1>
//     )
return (
  playlist ? (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Playlist Items */}
        {playlist.map((ele) => (
          <div
            key={ele._id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <Playlistpreview playlist={ele} />
          </div>
        ))}

        {/* Add Playlist Button */}
        <div className="flex justify-center">
          <button
            onClick={addplaylist}
            className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            ➕ Add Playlist
          </button>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-center text-2xl text-gray-700 font-semibold mt-20">
      Loading...
    </h1>
  )
);

}

export default collection;