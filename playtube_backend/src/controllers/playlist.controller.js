import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Playlist}  from "../models/playlist.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import mongoose from "mongoose";
const createPlaylist=asyncHandler(async(req,res)=>{
  const user=req.user._id;
  const {description,title} =req.body;
  const arr = JSON.parse(req.body.arr);
  if(!Array.isArray(arr)){
    throw new ApiError(401,"Must send all videos to be includ ein playlist in array format only");
  }

   if(!description.trim() || !title.trim()){
    throw new ApiError(403,"Name and description both are required for creating playlist");
   }
   let thumbnail="";
     const tthumbnail=req.file?.path
    if(tthumbnail) thumbnail = await uploadOnCloudinary(tthumbnail)
   const playlist=await Playlist.create({
    name:title,
    description,
    owner:user,
    videos:arr,
    thumbnail:thumbnail.secure_url
   })
   const gettedplaylist=await Playlist.findById(playlist._id);
   if(!gettedplaylist)  {
    throw new ApiError(501,"Internal server error");
   }
   return res.status(202)
   .json(
    new ApiResponse(202,gettedplaylist,"Playlist created successflly")
   )
})

const deletePlaylist=asyncHandler(async(req,res)=>{
    const user=req.user._id;
    const {playlistId}=req.params;
    const playlistid=new mongoose.Types.ObjectId(playlistId)
    const playlist=await Playlist.findById(playlistid)
    if(playlist.owner.toString()!=user){
        throw new ApiError(404,"Invlaid user to delete the playlist")
    }
    await Playlist.findByIdAndDelete(playlistid);
    return res.status(202)
    .json(
        new ApiResponse(202,null,"Playlist deleted successfully"),
    )
})

//non tested
const getUserPlaylist=asyncHandler(async(req,res)=>{
     const {userid}=req.params;
    if(!userid){
        throw new ApiError(404,"User id is required")
    }
    const videos=await Playlist.find({owner:userid})
    return res.status(202)
    .json(
        new ApiResponse(202,videos,"User playlist fetched successfully")
    )
})
 
const getplaylistbyid=asyncHandler(async(req,res)=>{
    const {id}=req.params
    if(!id){
        throw new ApiError(401,"Playlist id is required")
    }
    const data=await Playlist.findById(id)
    return res.status(201)
    .json(
        new ApiResponse(202,data,"getted palylist by id ")
    ) 
})
export {createPlaylist,deletePlaylist,getUserPlaylist,getplaylistbyid}