import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Subscription } from "../models/subscription.model.js"
import { mongoose } from "mongoose"

const subscribe=asyncHandler(async(req,res)=>{
    const {owner} =req.body
    const subscriber =req.user._id;

    if(!(owner && subscriber)){
        throw new ApiError(404,"Subscriber and channel both are required.")
    }
   const gen=await Subscription.create({
    channel: owner,
    subscriber: subscriber,
   })
   if(!gen){
    throw new ApiError(501,"Internal server error in creating subscription schema")
   }
   return res.status(201)
   .json(
    new ApiResponse(201,gen,"Subscription created successfully")
   )
})
const unsubscribe=asyncHandler(async(req,res)=>{
     const {owner} =req.body
    const subscriber =req.user._id;

    if(!(owner && subscriber)){
        throw new ApiError(404,"Subscriber and channel both are required.")
    }
    const gen=await Subscription.deleteOne({
        channel:owner,
        subscriber,
    })
    if(!gen){
        throw new ApiError(502,"Error while unsubscribing")
    }
    return res.status(200)
    .json(
        new ApiResponse(202,"User unsubsribed successfully")
    )
})
const getsubscribers=asyncHandler(async(req,res)=>{
    const user=req.user
 
    const data=await Subscription.countDocuments({channel:user._id})
    return res.status(201)
    .json( new ApiResponse(201,data,"Total subscribers for particular channel counted successfully"))
})
const getsubscribedto=asyncHandler(async(req,res)=>{
    const user=req.user
    const data=await Subscription.find({subscriber:user._id})
    return res.status(201)
    .json( new ApiResponse(201,data,"Total subscribers for particular channel counted successfully"))
})
export {subscribe,unsubscribe,getsubscribers,getsubscribedto}