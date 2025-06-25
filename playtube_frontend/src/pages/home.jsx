import React, { useEffect, useState } from "react";
import {Tweetpreview, Videopreview} from "../components/index.js"
import {getVideos} from "../ApiCalls/video.js"
import { getAllTweet } from "../ApiCalls/tweet.js";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const home=()=>{
    const [tweetstatus,setTweetstatus]=useState(false)
    const [videostatus,setVideostatus]=useState(true)
const [loader,setLoader]=useState(true);
const [videos,setVideos]=useState([])
const [tweets,setTweets]=useState([])
const status=useSelector(state=>state.auth.status)
const text=useSelector(state=>state.search.text)
const navigate=useNavigate();
useEffect(()=>{
     setLoader(true);
     if(!status) {
      navigate("/login")
     }
     const fetchdata=async()=>{
         const vid=await getVideos({query:text});
         const tweet=await getAllTweet();
         setTweets(tweet.data)
         setVideos(vid.data.videos);
     }
     fetchdata();
     setLoader(false)

},[text])

    const play=(vid)=>{
       navigate(`/video/${vid._id}`)
    }
  function  vidstat(){
       setVideostatus(true)
       setTweetstatus(false)
    }
  function  tweetstat(){
        setVideostatus(false)
       setTweetstatus(true)
    }
    // return (

    //     (!loader)?
    //     <div>
    //         <button onClick={vidstat}>Video</button>
    //         <button  onClick={tweetstat}>Tweet</button>
    //     {  (status && videostatus) && 
    //         videos.map((vid)=>(
    //             <div key={vid._id}  style={{cursor: "pointer"}} onClick={()=>play(vid)}>
    //             <Videopreview video={vid} />
    //             </div>
    //         ))
    //     }
    //     {
    //         (status && tweetstatus) && 
    //         tweets.tweets.map((twt)=>(
    //             <div key={twt._id}  style={{cursor: "pointer"}} >
    //             <Tweetpreview tweet={twt} />
    //             </div>
    //         ))
    //     }
    //     </div>:
    //      <h1 className="text-center text-2xl font-semibold text-red-600 mt-10">
    //   Please login
    // </h1>
        
    // )

    return (
  !loader ? (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Tab Buttons */}
     {status &&
     
     <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={vidstat}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            videostatus ? 'bg-blue-600' : 'bg-gray-400'
          } transition-all duration-200`}
        >
          Video
        </button>
        <button
          onClick={tweetstat}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            tweetstatus ? 'bg-blue-600' : 'bg-gray-400'
          } transition-all duration-200`}
        >
          Tweet
        </button>
      </div>}

      {/* Video Section */}
      {status && videostatus && (
        <div className="flex flex-col gap-6 items-center">
          {videos.map((vid) => (
            <div
              key={vid._id}
              onClick={() => play(vid)}
              className="w-full max-w-3xl bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <Videopreview video={vid} />
            </div>
          ))}
        </div>
      )}

      {/* Tweet Section */}
      {status && tweetstatus && (
        <div className="flex flex-col gap-6 items-center">
          {tweets.tweets.map((twt) => (
            <div
              key={twt._id}
              className="w-full max-w-3xl bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <Tweetpreview tweet={twt} />
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <h1 className="text-center text-2xl font-semibold text-red-600 mt-10">
      Please login
    </h1>
  )
);

}

export default home