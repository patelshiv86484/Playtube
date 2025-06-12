import React, { useEffect, useState } from "react";
import {videosById} from "../ApiCalls/video.js"
import { getUserById } from "../ApiCalls/user_auth.js";
import { useParams } from "react-router-dom";
import {getplaylistbyid} from "../ApiCalls/playlist.js"
import { Videopreview } from "./index.js";
import { useNavigate } from "react-router-dom";
const playlistdetail=()=>{
    const {id}=useParams();
  const [videos,setVideos]=useState([])
  const [owner,setOwner]=useState({})
  const [playlist,setPlaylist]=useState()
  const navigate=useNavigate();
   useEffect(()=>{
   const fetchdata=async()=>{
    const playlist=await getplaylistbyid(id)
    const user=await getUserById(playlist.data.owner)
    setPlaylist(playlist.data)
    setOwner(user.data)
    const nvid=playlist.data.videos.map(ele=>({"video":ele}))
     const vid=await videosById(nvid)
     setVideos(vid.data);
   }
   fetchdata();
   },[])
   const play=(vid)=>{
       navigate(`/video/${vid._id}`)
    }
  //  return (
  // (playlist && videos)?
  //   <>
  //   <div>
  //     <img src={owner.avatar} alt="Avatar" />
  //     <div>{owner.userName}</div>
  //     <div>{owner.fullName}</div>
  //     <div>{playlist.name}</div>
  //     <div>{playlist.description}</div>
  //   </div>
  //      <div>
  //       {
  //                videos.map((vid)=>(
  //               <div key={vid._id}  style={{cursor: "pointer"}} onClick={()=>play(vid)}>
  //               <Videopreview video={vid} />
  //               </div>
  //           ))
  //       }
  //       </div>
  //   </>:
  //   <h1>Loading</h1>
  //  )
  return (
  playlist && videos ? (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      
      {/* Owner + Playlist Info Block */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        
        {/* Owner Info (Left Side) */}
        <div className="flex flex-col items-center md:items-start md:w-1/4">
          <img
            src={owner.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 mb-2"
          />
          <h2 className="text-lg font-bold text-gray-800">{owner.userName}</h2>
        </div>

        {/* Playlist Info (Center) */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{playlist.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Created by @{owner.fullName}</p>
          <p className="text-gray-600 mt-3 text-base">{playlist.description}</p>
        </div>
      </div>

      {/* Videos Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        {videos.map((vid) => (
          <div
            key={vid._id}
            onClick={() => play(vid)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <Videopreview video={vid} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <h1 className="text-center text-xl text-red-600 mt-10">Loading...</h1>
  )
);

}

export default playlistdetail