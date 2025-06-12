import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import mongoose from "mongoose";
import { Tweet } from "../models/tweet.model.js";


const postTweet=asyncHandler(async (req,res)=>{
    const user=req.user._id;
    const {content} =req.body;

    if(!content.trim()){
        throw new ApiError(401,"Content is required to tweet");
    }
    const userid=new mongoose.Types.ObjectId(user);
    const tweet=await Tweet.create({
        content,
        owner:userid,
    })
    const gettedtweet=await Tweet.findById(tweet._id)
    if(!gettedtweet){
        throw new ApiError(501,"Internal server error");
    }
    return res.status(202)
    .json(
        new ApiResponse(202,gettedtweet,"Tweeted successfully")
    )
})

const editTweet=asyncHandler(async (req,res)=>{
    const user=req.user._id;
    const {tweetId}=req.params;
    const {content}=req.body;
    if(!tweetId){
        throw new ApiError(401,"TweetId is required fro editing")
    }
    const tweetid=new mongoose.Types.ObjectId(tweetId);
    const tweet=await Tweet.findById(tweetid);
    if(tweet.owner.toString()!=user){
        throw new ApiError(402,"Invlaid user o edit this tweet");
    }
    const updatedTweet=await Tweet.findByIdAndUpdate(
        tweetid,
        {
            content,
        },
        {
            new :true
        }
    )
    return res.status(202)
    .json(
        new ApiResponse(202,updatedTweet,"Tweetupdated successfully")
    )
})

const deleteTweet=asyncHandler(async (req,res)=>{
      const user=req.user._id;
      const {tweetId}=req.params;
      if(!tweetId){
        throw new ApiError(401,"Tweet id is required to delete the tweet")
      }
      const tweetid=new mongoose.Types.ObjectId(tweetId);
      const tweet=await Tweet.findById(tweetid);
      if(tweet.owner.toString()!= user){
        throw new ApiError(404,"Invalid user to delete this tweet");
      }
      await Tweet.findByIdAndDelete(tweetid);
      return res.status(201)
      .json(
        new ApiResponse(202,null,"Tweet deleted successfully")
      )
})

const getTweet=asyncHandler(async (req,res)=>{
    
         const { page = 1, limit = 10, sortBy='createdAt', sortType='desc' } = req.query
         const {userId}=req.body
         let filter={};
         if(userId){
            filter.owner=userId
         }
        const sortOrder=sortType==='asc'?1:-1;//1->ascending and -1-> for descending
        const sortOptions={[sortBy]:sortOrder};//sortBy field dynamically like createdAt:1
        const skip=(page-1)*limit;//page = 3: skip 20 → get items 21–30
    
         const [tweets,total]=await Promise.all([
            Tweet.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit)),
    
            Tweet.countDocuments(),
        ]);
           const data={tweets,total};
    
         res.status(202)
         .json(
            new ApiResponse(202,data,"All tweets fetched successfully")
         )
    
})

export {postTweet,editTweet,deleteTweet,getTweet}