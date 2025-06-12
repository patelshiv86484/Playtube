// import React from "react";

// export default playListPreview=({playlist})=>{
//      return (
//         <div>
//             <img src="playlist.thumbnail" alt="Playlist thumbnail" />
//             <div>{playlist.views}</div>
//             <div>{playlist.createdAt}</div>
//             <div>{playlist.title}</div>
//             <div>{playlist.description}</div>
//         </div>
//      )
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import {deletePlaylist} from "../ApiCalls/playlist.js"
import moment from "moment";
const PlayListPreview = ( {playlist} ) => {
   const navigate=useNavigate();
   const viewplaylist=async(detail)=>{
    navigate(`/playlist/${detail._id}`)
   }
   const removeplaylist=async (detail)=>{
        const d1= await deletePlaylist(detail._id)
        window.location.reload();
   }
  // return (
  //   <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg max-w-xl mx-auto">
  //     {/* Thumbnail and background */}
  //     <div className="relative h-56 bg-gradient-to-tr from-indigo-500 via-blue-400 to-pink-400 flex items-center justify-center">
  //       <img
  //         src={playlist?.thumbnail}
  //         alt="Playlist thumbnail"
  //         className="object-cover h-40 w-56 rounded-md shadow-xl border-4 border-white"
  //       />
  //     </div>
  //     {/* Playlist details */}
  //     <div className="p-6">
  //       <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
  //         <span>Playlist</span>
  //         <span>{playlist.videos.length} videos</span>
  //       </div>
  //       <div className="flex justify-between items-center text-gray-400 text-xs mb-4">
  //         <span>{playlist.views} Views</span>
  //         <span>{moment(playlist.createdAt).fromNow()}</span>
  //       </div>
  //       <div className="font-bold text-white text-xl mb-2">{playlist.name}</div>
  //       <div className="text-gray-300 text-base mb-4">{playlist.description}</div>
  //       <button onClick={()=>viewplaylist(playlist)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
  //         Watch Now
  //       </button>
  //           <button onClick={()=>removeplaylist(playlist)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
  //         Remove playlist
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
  <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg max-w-xl mx-auto hover:shadow-2xl transition-all duration-300">
    {/* Thumbnail section */}
    <div className="relative h-56 bg-gradient-to-tr from-indigo-500 via-blue-400 to-pink-400 flex items-center justify-center">
      <img
        src={playlist?.thumbnail}
        alt="Playlist thumbnail"
        className="object-cover h-40 w-56 rounded-lg shadow-lg border-4 border-white"
      />
    </div>

    {/* Playlist details */}
    <div className="p-6 space-y-4">
      <div className="flex justify-between text-gray-400 text-sm">
        <span>🎵 Playlist</span>
        <span>{playlist.videos.length} Videos</span>
      </div>

      <div className="flex justify-between text-gray-500 text-xs">
        <span>{playlist.views} views</span>
        <span>{moment(playlist.createdAt).fromNow()}</span>
      </div>

      <div className="text-white text-2xl font-semibold">{playlist.name}</div>
      <p className="text-gray-300 text-sm leading-relaxed">{playlist.description}</p>

      <div className="flex gap-4 pt-2">
        <button
          onClick={() => viewplaylist(playlist)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          ▶️ Watch Now
        </button>

        <button
          onClick={() => removeplaylist(playlist)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          ❌ Remove
        </button>
      </div>
    </div>
  </div>
);

};

export default PlayListPreview;
