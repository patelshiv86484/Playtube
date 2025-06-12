import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { totalviews,adminvideodetail,toggle,deletevid } from "../ApiCalls/video";
import { getSubscribers } from "../ApiCalls/subscription";
import { getlikescount } from "../ApiCalls/like";
import { useSelector } from "react-redux";
import moment from 'moment';

const admin=()=>{
    const [loader,setLoader]=useState(true)
    const [refresh,setRefresh]=useState(true)
   const [views,setViews]=useState()
   const [subscribers,setSubscribers]=useState()
   const [likes,setLikes]=useState()
   const [videos,setVideos]=useState([])
   const userData=useSelector(state=>state.auth.userData)
   const navigate=useNavigate();
    useEffect(()=>{
      const fetchdata=async()=>{ 
        setLoader(true)
         const view=await totalviews();
         const sub=await getSubscribers()
         const likes=await getlikescount(userData.userName)
         const vid=await adminvideodetail();
         setVideos(vid.data);
         setViews(view.data)
         setSubscribers(sub.data)
         setLikes(likes.data)
        

         setLoader(false)
      }
      fetchdata();
    },[refresh])
  
 async function ttoggle(ele){
    await  toggle(ele)
    setRefresh(prev=>!prev)
  }
  async function del(ele){
    await deletevid(ele._id)
  }
   function uploadvid(){
    // setUpload(true)
    navigate("/add-video")
   }
//     return ( 
//      (!loader)?
//         <>
//            <div onClick={uploadvid} >Upload Video</div>
//            {
//             upload &&
//             <Videoform />
//            }
//            <div>{"Likes "+likes}</div>
//            <div>{"Subscribers " +subscribers}</div>
//            <div>{"Views "+views}</div>

//            <div >
//             {
//             videos.map(ele=>(
// <div key={ele._id} > 
                  
//  <div onClick={()=>ttoggle(ele)} className={`w-[75px] h-[40px] rounded-full cursor-pointer flex items-center px-1 transition-colors duration-300 ${ele.isPublished ? "bg-purple-400" : "bg-gray-400"}`}><div className={`w-[30px] h-[30px] bg-black rounded-full transition-all duration-300 ${ele.isPublished ? "translate-x-[35px]" : "translate-x-0"}`} /></div>
//  <div>{ele.isPublished?"Published":"Notpublished"}</div>
//                   <div>{ele.description}</div>
//                   <div>{ele.likec.length +"Likes"}</div>
//                   <div>{moment(ele.createdAt).fromNow()}</div>
//                   <button onClick={()=>del(ele)}>Delete</button>
// </div>
//                   )) }
//            </div>
//         </>:
//         <h1>Loading</h1>
//         )

return (
  !loader ? (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      
      {/* Upload Button */}
      <div>
        <button
          onClick={uploadvid}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition"
        >
          Upload Video
        </button>
      </div>

      {/* Video Upload Form */}
     

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-purple-800">Likes</h4>
          <p className="text-xl font-bold text-purple-700">{likes}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-green-800">Subscribers</h4>
          <p className="text-xl font-bold text-green-700">{subscribers}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-blue-800">Views</h4>
          <p className="text-xl font-bold text-blue-700">{views}</p>
        </div>
      </div>

      {/* Videos List */}
<div className="space-y-6">
  {videos.map((ele) => (
    <div
      key={ele._id}
      className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
    >
      {/* Header Row: Toggle + Status */}
      <div className="flex items-center justify-between mb-4">
        {/* Toggle Switch */}
        <div
          onClick={() => ttoggle(ele)}
          className={`w-16 h-8 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${
            ele.isPublished ? "bg-green-400" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
              ele.isPublished ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </div>

        {/* Publish Status Label */}
        <span
          className={`text-sm font-medium ${
            ele.isPublished ? "text-green-600" : "text-gray-500"
          }`}
        >
          {ele.isPublished ? "Published" : "Not Published"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-800 text-base font-medium mb-2">
        {ele.description || "No description provided."}
      </p>

      {/* Meta Info */}
      <div className="flex items-center text-sm text-gray-500 space-x-6 mb-4">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span>{ele.likec.length} Likes</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-.001V3a1 1 0 00-1-1H6zm1 3V4h6v1H7z" />
          </svg>
          <span>{moment(ele.createdAt).fromNow()}</span>
        </div>
      </div>

      {/* Delete Button */}
      <div className="text-right">
        <button
          onClick={() => del(ele)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm shadow"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  ) : (
    <h1 className="text-center text-xl font-semibold text-gray-700">Loading...</h1>
  )
);

}

export default admin;