import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Comment } from "../models/comment.model.js"
import { mongoose } from "mongoose"

const postComment=asyncHandler(async (req,res)=>{
const {videoId}=req.params
const {content}=req.body;
const owner=req.user._id;

if(!videoId){
    throw new ApiError(401,"Invalid video id")
}
if(!content){
    throw new ApiError(402,"content is required to post the comment")
}
if(!owner){
    throw new ApiError(40,"Invalid user")
}


const createdComment = await Comment.create({
    content,
    video:videoId,
    owner,
})
//verifying with database is comment with particular id is created or not.
const gettedComment=await Comment.findById(createdComment._id);
if(!gettedComment){
  throw new ApiError(405,"Internal server error while posting comment")
}
     res.status(202)
     .json(
        new ApiResponse(202,gettedComment,"Comment posted succesfully")
     )
})

const deleteComment=asyncHandler(async(req,res)=>{
    const owner=req.user._id;
    const {commentId}=req.params;
    const commentid=new mongoose.Types.ObjectId(commentId)
    const comment=await Comment.findById(commentid)
      if(!comment){
        throw new ApiError(401,"Invalid comment id");
    }

    if(comment.owner.toString()!=owner.toString()){
        throw new ApiError(404,"Invalid user to delete this comment");
    }
    await Comment.findByIdAndDelete(comment)

    return res.status(201)
    .json(
        new  ApiResponse(201,"Comment deleted successfully")
    )
})

const getAllComments=asyncHandler(async(req,res)=>{
     const { page = 1, limit = 10, videoId, sortBy='createdAt', sortType='desc' } = req.query
     let filter={};
    if (videoId) {
        filter.video = videoId;
    }
    
    const sortOrder=sortType==='asc'?1:-1;//1->ascending and -1-> for descending
    const sortOptions={[sortBy]:sortOrder};//sortBy field dynamically like createdAt:1
    const skip=(page-1)*limit;//page = 3: skip 20 → get items 21–30

     const [comments,total]=await Promise.all([
        Comment.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit)),

        Comment.countDocuments(filter),
    ]);
       const data={comments,total};

     res.status(202)
     .json(
        new ApiResponse(202,data,"All comments fetched successfully")
     )

})

export {postComment,deleteComment,getAllComments}