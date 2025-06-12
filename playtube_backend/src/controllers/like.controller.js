import { Mongoose } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Like} from "../models/like.model.js"
import { mongoose } from "mongoose";
import { Video } from "../models/video.model.js";

//--------------------------------------------------------------------IMPORTANT---------------------------------------------------------------------
//In like there can be 3 types of lke one for video second for comment third for tweet so all three can be indentified(or differentiated) by number sent in req,body like 1 for video, 2 for comment, 3 for tweet.


const postLike=asyncHandler(async(req,res)=>{
    const {varId}=req.params;
    //idNumber==1 for videoId ,idNumber==2 for commentId,idNumber==3 for tweets
    const {idNumber}=req.body;
    const user=req.user._id;
    if(idNumber=="1"){//means liked on video
       if(!user){
        throw new ApiError(401,"Invalid user");
       }
       const liked=await Like.create({
        video:varId,
        likedBy:user,
      } )
    const gettedLike=await Like.findById(liked._id);
    if(!gettedLike){
        throw new ApiError(404,"Internal server error")
    }
    return res.status(202)
    .json(
        new ApiResponse(202,gettedLike,"Liked successfully on video")
    )
    }
    else  if(idNumber=="2"){//means liked on comment
       if(!user){
        throw new ApiError(401,"Invalid user");
       }
       const liked=await Like.create({
        comment:varId,
        likedBy:user,
      } )
    const gettedLike=await Like.findById(liked._id);
    if(!gettedLike){
        throw new ApiError(404,"Internal server error")
    }
    return res.status(202)
    .json(
        new ApiResponse(202,gettedLike,"Liked successfully on comment")
    )
    }
    else if(idNumber=="3"){//means liked on tweet
       if(!user){
        throw new ApiError(401,"Invalid user");
       }
       const liked=await Like.create({
        tweet:varId,
        likedBy:user,
      } )
    const gettedLike=await Like.findById(liked._id);
    if(!gettedLike){
        throw new ApiError(404,"Internal server error")
    }
    return res.status(202)
    .json(
        new ApiResponse(202,gettedLike,"Liked successfully on tweet")
    )
    }

})

const geAllLikes=asyncHandler(async (req,res)=>{
      const {varId}=req.params;
    //idNumber==1 for videoId ,idNumber==2 for commentId,idNumber==3 for tweets
    const {idNumber}=req.body;
    if(idNumber=="1"){
       const count=await Like.countDocuments({video:new mongoose.Types.ObjectId(varId)})
       const isLiked=await Like.exists({likedBy:new mongoose.Types.ObjectId(req.user._id),video:new mongoose.Types.ObjectId(varId)})
const data={count,isLiked}
 return res.status(202)
 .json(
    new ApiResponse(202,data,"Fetched all likes on video")
 )
    }


    if(idNumber=="2"){
        const filter = {
    comment: new mongoose.Types.ObjectId(varId)
                     };
    const [likes, likeCount] = await Promise.all([
    Like.find(filter),
    Like.countDocuments(filter)
]);

const data={likes,likeCount};
 return res.status(202)
 .json(
    new ApiResponse(202,data,"Fetched all likes on comment")
 )
    }
    if(idNumber=="3"){ 
        const count=await Like.countDocuments({tweet:new mongoose.Types.ObjectId(varId)})
       const isLiked=await Like.exists({likedBy:new mongoose.Types.ObjectId(req.user._id),tweet:new mongoose.Types.ObjectId(varId)})
const data={count,isLiked}
 return res.status(202)
 .json(
    new ApiResponse(202,data,"Fetched all likes on tweet")
 )
    }
})

const removeLike=asyncHandler(async (req,res)=>{
    const {varId}=req.params;
    const {idNumber}=req.body
    const user=req.user._id;
    const id=new mongoose.Types.ObjectId(varId)
    
  if(idNumber=="1"){
const likeid=await Like.find({
    likedBy:new mongoose.Types.ObjectId(user),
    video:id})

    const like=await Like.findById(likeid)
    if(user.toString() != like.likedBy.toString()){
        throw new ApiError(404,"Invalid user to remove this like");
    }
    await Like.deleteOne({
        _id:likeid
    })
    return res.status(202)
    .json(
        new ApiResponse(202,null,"Disliked successfully")
    )
  }
  if(idNumber=="2"){
const likeid=await Like.find({
    likedBy:new mongoose.Types.ObjectId(user),
    video:id})

    const like=await Like.findById(likeid)
    if(user.toString() != like.likedBy.toString()){
        throw new ApiError(404,"Invalid user to remove this like");
    }
    await Like.deleteOne({
        _id:likeid
    })
    return res.status(202)
    .json(
        new ApiResponse(202,null,"Disliked successfully")
    )
  }
  if(idNumber=="3"){
const tweetid=await Like.find({
    likedBy:new mongoose.Types.ObjectId(user),
    tweet:id})

    const like=await Like.findById(tweetid)
    if(user.toString() != like.likedBy.toString()){
        throw new ApiError(404,"Invalid user to remove this like");
    }
    await Like.deleteOne({
        _id:tweetid
    })
    return res.status(202)
    .json(
        new ApiResponse(202,null,"Disliked successfully")
    )
  }
})

const likescount=asyncHandler(async(req,res)=>{
    const {idNumber}=req.body
    const {userName}=req.params
    if(idNumber==1){//get likes for video

   const result = await Like.aggregate([
  // Step 1: Join with videos
  {
    $lookup: {
      from: "videos", // collection name must be lowercase plural
      localField: "video",
      foreignField: "_id",
      as: "videoData"
    }
  },
  { $unwind: "$videoData" },

  // Step 2: Join with users
  {
    $lookup: {
      from: "users",
      localField: "videoData.owner",
      foreignField: "_id",
      as: "ownerData"
    }
  },
  { $unwind: "$ownerData" },

  // Step 3: Match on username
  {
    $match: {
      "ownerData.userName": userName.toLowerCase() // ensure lowercase
    }
  },

  // Step 4: Count the total
  {
    $count: "likeCount"
  }
]);



const count = result[0]?.likeCount || 0;
return res.status(200)
.json(new ApiResponse(202,count,"Total like fetched successfully"))
    }
})
const likedVideoByUser =asyncHandler(async(req,res)=>{
    const user=new mongoose.Types.ObjectId(req.user._id);
    const data=await Like.find({likedBy:user,  video: { $ne: null } });
    return res.status(201).
    json(new ApiResponse(202,data," Liked Documents fetched successfully"))
})

export {postLike,geAllLikes,removeLike,likedVideoByUser,likescount}