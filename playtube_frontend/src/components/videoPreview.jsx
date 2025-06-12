// import React from "react";

// export default videoPreview=({video})=>{
//     return (
//         <div>
//         <img src={video.thumbnail} alt="Thumbnail" />
//         <div>{video.title}</div>
//         <div>{video.views}</div>
//          <div>{video.createdAt}</div>
//         <div>{video.owner}</div>
//         <div>{video.description}</div>
//         </div>
//     )
// }

import React from "react";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
const VideoPreview = ( {video} ) => {
  const navigate=useNavigate();
   const gotochannel=(e)=>{{
      e.stopPropagation();
       navigate(`/channel/${video.owner.userName}`)
   }}
 return (
  <div className="flex bg-[#f3f4f6] rounded-xl shadow-md overflow-hidden max-w-3xl mx-auto my-6 relative">
    {/* Thumbnail */}
    <div className="flex-shrink-0 w-60 h-40 bg-gray-300 flex items-center justify-center">
      <img
        src={video.thumbnail}
        alt="Thumbnail"
        className="object-cover w-full h-full"
      />
    </div>

    {/* Details */}
    <div className="flex flex-col justify-between p-5 flex-1">
      <div>
        <div className="text-gray-800 text-lg font-semibold mb-1 line-clamp-2">
          {video.title}
        </div>
        <div className="flex items-center text-gray-600 text-sm space-x-3 mb-2">
          <span>{video.views} Views</span>
          <span>•</span>
          <span>{moment(video.createdAt).fromNow()}</span>
        </div>
        <div className="text-gray-700 text-sm mb-3">{video.owner.fullName}</div>
        <div className="text-gray-600 text-sm line-clamp-2">{video.description}</div>
      </div>

      <div className="flex items-center mt-4 cursor-pointer" onClick={gotochannel}>
        <img
          src={video.owner.avatar}
          alt=""
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-indigo-600 font-medium">{video.owner.userName}</span>
      </div>
    </div>
  </div>
);

};

export default VideoPreview;
