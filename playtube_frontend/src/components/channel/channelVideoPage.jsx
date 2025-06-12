import React,{useEffect, useState} from "react";
import {getUserVideos} from "../../ApiCalls/video"
import Videopreview from "../videoPreview"
const channelVideoPage=({userid})=>{
  const [videos,setVideos]=useState([])
  const [loader,setLoader]=useState(true)

  useEffect(()=>{
    setLoader(true)
   const fetchData=async()=>{
    const vid=await getUserVideos({userid})
    setVideos(vid);
   }
   fetchData();
   setLoader(false)
  },[]  )

  return ((!loader)?
    <>
      {videos.legth!==0?(
        videos?.map(vid=>{
            <Videopreview vid/>
        })) :(
        <h2>No Videos Uploaded by this channel</h2>
        )
      }
    </>:
    <h1>Loading</h1>
  )
}

export default channelVideoPage