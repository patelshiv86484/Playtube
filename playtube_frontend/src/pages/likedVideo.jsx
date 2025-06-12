import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {likedVideoByUser}  from "../ApiCalls/like.js"
import {videosById}  from "../ApiCalls/video.js"
import { Videopreview } from "../components/index.js";
const likedVideo=()=>{
    const [videos,setVideos] =useState([])
    const navigate=useNavigate();
    useEffect(()=>{
       const fetchdata=async ()=>{
         const temp=await likedVideoByUser();
         const vid=await videosById(temp.data)
         setVideos(vid.data)
       }
       fetchdata();
    },[])
  const play=(vid)=>{
  navigate(`/video/${vid._id}`)
  }
   return (
    videos.length!==0?
   <>
       {
        videos.map((vid)=>(
                <div key={vid._id}  style={{cursor: "pointer"}} onClick={()=>play(vid)}>
                <Videopreview video={vid} />
                </div>
            ))
       }
   </> :
   <h1>No liked Videos</h1>    )
}

export default likedVideo