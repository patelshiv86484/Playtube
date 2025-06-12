import React, { useEffect, useState } from "react";
import { getVideos } from "../ApiCalls/video";
import { Videopreview } from "../components/index.js";
import { createPlaylist } from "../ApiCalls/playlist.js";
import {Input} from "../components/index.js"
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
const addPlaylist=()=>{
    const [videos,setVideos]=useState([])
    const [vid,setVid]=useState([])
    const {handleSubmit,register}=useForm()
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchdata=async()=>{
          const d1=await getVideos({});
          setVid(d1.data.videos);
        }
        fetchdata();
    },[])
  const add=(ele)=>{
    setVideos([...videos,ele._id])
  }
  const submit=async (data)=>{
        const d1=await createPlaylist({title:data.title,description:data.description,arr:videos,thumbnail:data.thumbnail[0]})
        navigate(`/playlist/${d1.data._id}`)
  }
    return (
        vid?
    <>
    <form onSubmit={handleSubmit(submit)}>
        <button type="submit" >Create</button>
      <Input 
         type="text"
         label="Title: "
         placeplaceholder="Enter Title for playlist"
         {...register('title')}
      />

      <Input 
         type="text"
         label="Description: "
         placeplaceholder="Enter Description for playlist"
         {...register('description')}
      />
      <Input 
        type="file" accept="image/*"
         label="Thumbnail: "
         placeplaceholder="Upload thumbnail image"
         {...register('thumbnail')}
      />
      </form>
     {
        vid.map(ele=>{
           return   <div key={ele._id} onClick={()=>add(ele)}>
         <   Videopreview video={ele} />
         </div>
        })
     }

    </>:
    <h1>Loading</h1>  )
}

export default addPlaylist