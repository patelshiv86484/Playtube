import mongoose,{isValidObjectId} from "mongoose";
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { json } from "express";


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy='createdAt', sortType='desc', userId } = req.query//userId for fetching video of particular channel.
    //TODO: get all videos based on query, sort, pagination
    
    const filter={};//dynamically creating a search filter. 
    if(query){
        filter.$or=[//match at least one of the following condition.
            {title:{$regex:query ,$options:'i'}},//regex search for ${query} substring in a title with search case insensitive(as $options:'i')
            {description:{$regex:query,$options:'i'}},
        ];
    }
    if(userId){
        filter.owner=userId;
    }
    filter.isPublished=true
    const sortOrder=sortType==='asc'?1:-1;//1->ascending and -1-> for descending
    const sortOptions={[sortBy]:sortOrder};//sortBy field dynamically like createdAt:1
    const skip=(page-1)*limit;//page = 3: skip 20 → get items 21–30
    
    const [tvideo,total]=await Promise.all([
        Video.find(filter)
        .sort(sortOptions)
        .skip(skip)//skips first skip(20 for page=3) elements.
        .limit(parseInt(limit)),//return atmost limit(10) elements.
     
        Video.countDocuments(filter),
    ]);
       const videos=await Promise.all(tvideo.map(async ele=>{
          ele.owner= await User.findById(ele.owner).select("fullName userName avatar")
          return ele
    }))
       const data={videos,total};

    return res
    .status(202)
    .json(
        new ApiResponse(202,data,"Fethed all videos")
    )
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    //1.get video path from req.files(multer middleware)
    //2.upload on cloudinary and set it as videoFile.
    //3.Do same with thumbnail.
    //4.Get owner _id and store it in Owner.
    //5.set title and description.
    //6.get duration of video and initially views=0.
    //7.set isPublised=true.
    //  console.log(req.files)
    //  console.log("-------------")
    const videoFileLocalPath=req.files?.videoFile[0]?.path;
    if(!videoFileLocalPath){
        throw new ApiError(402,"Videofile is required")
    }
    const thumbnailLocalPath=req.files?.thumbnail[0]?.path;
    if(!thumbnailLocalPath){
        throw new ApiError(402,"Thumbnail is missing");
    }
    const videoFile=await uploadOnCloudinary(videoFileLocalPath);
    const thumbnail=await uploadOnCloudinary(thumbnailLocalPath);

    if(!videoFile || !thumbnail){
        throw new ApiError(402,"videofile or thumbnail is required");
    }

    const ownerId=req.user._id;
    if(!ownerId){
        throw new ApiError(401,"Owner id is required");
    }

    const video =await Video.create({
        videoFile:videoFile.secure_url,
        thumbnail:thumbnail.secure_url,
        owner:ownerId,
        title,
        description,
        duration:0,
        views:0,
        isPublished:true,
    })

    const createdVideo=await Video.findById(video._id);
    if(!createdVideo){
        throw new ApiError(500,"Internal server error")
    }
    //   console.log(createdVideo)
    return res
    .status(202)
    .json(
        new ApiResponse(202,createdVideo._id,"Video uploaded Successfully in MongoDB")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //No need to convert in ObjectId by mistake this is done as only in aggregation it is reqired otherwise internally converted.
    const videoid=new mongoose.Types.ObjectId(videoId)
    const video=await Video.findById(videoid);
    if(!video){
        throw new ApiError(401,"Video Id invalid");
    }
    const user=await User.findById(req.user._id);
      if (!user.watchHistory.includes(videoId)) {
        user.watchHistory.push(videoId);
        video.views=video.views+1;
        await video.save({validateBeforesave:false})
        // console.log(video)
        await user.save({validateBeforesave:false}); 
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,video,"Video getted successfully")
    )
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const videoid=new mongoose.Types.ObjectId(videoId);
    const video=await Video.findById(videoid);
    const {title,description}= req.body;

    if(!title || !description) {
        throw new ApiError(403,"Title and description both are required");
    }
    // console.log(typeof(video.owner))
    // console.log(typeof(req.user?._id))
    if(video.owner.toString() != req.user?._id.toString()){//this is required as both are of object type so object compares by refrence not by value but string compares by value that's why conversion to string is required.
        throw new ApiError(403,"Invalid user")
    }
    const getvideo=await Video.findByIdAndUpdate(
        videoid,
        {
           $set:{
               title,
               description,
           }
        },
        {
            new:true,
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(202,getvideo,"Video details updated successfully"),
    )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const video=await Video.findById(videoId);
    const userId=video?.owner;
    if(userId!=req.user._id.toString()){
        throw new ApiError(401,"Invalid user to delete the video")
    }

    await Video.findByIdAndDelete(videoId)
     
    return res
    .status(202)
    .json(
         new ApiResponse(202," Video deleted successfully")
        )
})


//not tested
const getUserVideos=asyncHandler(async(req,res)=>{
    const {userid}=req.params;
    if(!userid){
        throw new ApiError(404,"User id is required")
    }
    const videos=await Video.find({owner:userid})
    return res.status(202)
    .json(
        new ApiResponse(202,videos,"Uservideos fetched successfully")
    )
})

const videosById=asyncHandler(async(req,res)=>{
    const {arr}=req.body
    const objid=arr.map(ele=>new mongoose.Types.ObjectId(ele.video))
    const tdata=await Video.find({ _id: { $in: objid } })
    const data=await Promise.all(
         tdata.map( async ele=>{
            ele.owner= await User.findById(ele.owner).select("fullName userName avatar")
              return ele
         })
    )
    return res.status(201)
    .json(
        new ApiResponse(204,data,"VideosById fetched successfully")
    )
})

  const totalviews=asyncHandler(async(req,res)=>{
     const user=req.user._id;
     const result = await Video.aggregate([
  {
    $match: {
      owner: new mongoose.Types.ObjectId(user), 
    },
  },
  {
    $group: {
      _id: null,//not group by specific type group all
      totalViews: { $sum: "$views" },
    },
  },
]);

const totalviews = result[0]?.totalViews || 0;
return res.status(200)
.json(
    new ApiResponse(200,totalviews,"Total vies counted successfully")
)
  })

  
const videoDetailAdmin=asyncHandler(async(req,res)=>{
  const user=req.user._id;
  const result=await Video.aggregate([
     {
        $match:{owner:new mongoose.Types.ObjectId(user)}
     },{
        $lookup:{
            from:"likes",
            localField:"_id",
            foreignField:"video",
            as:"likec"
        }
     }, {
    $addFields: {
      totalLikes: { $size: "$likec" } // count number of likes for this video
    }
  },
  ])
  return res.status(200)
  .json(
    new ApiResponse(201,result,"Detail for admin fetched successfully")
  )
})

const toggle=asyncHandler(async (req,res)=>{
    const {ele}=req.body
    const nstatus=!ele.isPublished
    const userId=ele.owner;
        if(req.user._id.toString() != userId){
        throw new ApiError(402,"Invalid user  for toogle")
    }
    // console.log(nstatus)
    await Video.findByIdAndUpdate(
        ele._id,
        {
        isPublished:nstatus
    },{
    new:true
      })

    return res.status(201)
    .json(
        new ApiResponse(202,toggle,"Toggled successfully")
    )
})
export {
    toggle,
    totalviews,
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    getUserVideos,
    videosById,
    videoDetailAdmin
}