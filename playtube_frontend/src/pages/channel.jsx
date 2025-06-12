import React,{useState,useEffect} from "react";
import { getChannelDetails } from "../ApiCalls/user_auth";
import { getVideos } from "../ApiCalls/video.js";
import { getAllTweet } from "../ApiCalls/tweet.js";
import {subscribe,unsubscribe} from "../ApiCalls/subscription.js"
import { useSelector } from "react-redux";
import { Videopreview ,Tweetpreview} from "../components/index.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const channel=()=>{

  const {channelname}=useParams();
    const [channel,setChannel]=useState();
    const [videos,setVideos]=useState([]);
    const [tweets,setTweets]=useState([]);

    const [tweetsstatus,setTweetsstatus]=useState(false);
    const [videosstatus,setVideosstatus]=useState(true);
    const [channstat,setChannstat]=useState(true);

    const userData=useSelector(state=>state.auth.userData)
    const navigate=useNavigate();
   
    useEffect(()=>{
        const fetchdata=async ()=>{
           const chann=await getChannelDetails(channelname)
          const vid=await getVideos({userId:chann.data._id})
          const twt=await getAllTweet(chann.data._id)
          setChannel(chann.data)
          setTweets(twt.data)
          setVideos(vid.data.videos)
        }
        fetchdata();
    },[channstat])

  const play=(vid)=>{
  navigate(`/video/${vid._id}`)
  }
  const setvideosstatus=()=>{
      setVideosstatus(true)
      setTweetsstatus(false)
  }
  const settweetsstatus=()=>{
      setVideosstatus(false)
      setTweetsstatus(true)
  }
  const uploadtweet=()=>{
    navigate("/upload-tweet")
  }
  const uploadvideo=()=>{
    navigate("/add-video")
  }

  const unsub=async ()=>{
      await unsubscribe(channel._id)
      setChannstat(prev=>!prev)
  }
  const sub=async ()=>{
     await subscribe(channel._id)
     setChannstat(prev=>!prev)
  }
//     return (
//     channel?
//         <>

//         <img src={channel.coverImage} alt="Coverimage" />
//         <img src={channel.avatar} alt="Coverimage" />
//         <div>{channel.userName}</div>
//         <div>{channel.fullName}</div>
//         <div>{channel.channelsSubscribedToCount}</div>
//         <div>{channel.subscribersCount}</div>
//         <div>{"Is subscribed  "+ channel.isSubscribed}</div>
  
//   <div className="flex justify-between w-full">
//   <button onClick={setvideosstatus} className="px-4 py-2 bg-blue-500 text-white rounded">Videos</button>
//   <button onClick={settweetsstatus}className="px-4 py-2 bg-blue-500 text-white rounded">Tweets</button>
//   {/* <button className="px-4 py-2 bg-blue-500 text-white rounded">Subscribed</button> */}
// </div>

// {(videos && videosstatus) && 
//     <>
//      {
//         videos.map(ele=>(
//              <div key={ele._id}  style={{cursor: "pointer"}} onClick={()=>play(ele)}>
//                 <Videopreview video={ele}/>
//               </div>
//         ))
//      }
//     </>
//    }

//    {
//     (tweets && tweetsstatus) && 
//     <>
//      {
//         tweets.tweets.map(ele=>(
//              <div key={ele._id}  style={{cursor: "pointer"}} >
//                 <Tweetpreview tweet={ele} userstat={true}/>
//               </div>
//         ))
//      }
//       <button onClick={uploadtweet} >Upload Tweet</button>
//     </>
//    }

//         </>:
//         <h1>Loading please wait</h1>
//     )

return (
  channel ? (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Cover Image */}
      <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
        <img
          src={channel?.coverImage || "/default-avatar.png" }
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Avatar and Basic Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={channel.avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
        <div>
          <h2 className="text-xl font-bold">{channel.userName}</h2>
          <p className="text-gray-600">{channel.fullName}</p>
        </div>
      </div>

      {/* Stats Section */}
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
  <div className="bg-white rounded-lg shadow p-4">
    <div className="text-lg font-semibold text-blue-600">
      {channel.channelsSubscribedToCount}
    </div>
    <div className="text-gray-500">Subscribed Channels</div>
  </div>
  
  <div className="bg-white rounded-lg shadow p-4">
    <div className="text-lg font-semibold text-blue-600">
      {channel.subscribersCount}
    </div>
    <div className="text-gray-500">Subscribers</div>
  </div>

  <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
    {channel.isSubscribed ? (
      <button
        onClick={unsub}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Unsubscribe
      </button>
    ) : (
      <button
        onClick={sub}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Subscribe
      </button>
    )}
  </div>
</div>


      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={setvideosstatus}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            videosstatus ? "bg-blue-600" : "bg-gray-400"
          } transition`}
        >
          Videos
        </button>
        <button
          onClick={settweetsstatus}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            tweetsstatus ? "bg-blue-600" : "bg-gray-400"
          } transition`}
        >
          Tweets
        </button>
      </div>

      {/* Video List */}
      {videos && videosstatus && (
        <div className="flex flex-col gap-6 items-center">
          {videos.map((ele) => (
            <div
              key={ele._id}
              onClick={() => play(ele)}
              className="w-full max-w-3xl bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <Videopreview video={ele} />
            </div>
          ))}

        {channel._id==userData._id &&    <button
            onClick={uploadvideo}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Upload Video
          </button>}
        </div>
      )}

      {/* Tweet List */}
      {tweets && tweetsstatus && (
        <div className="flex flex-col gap-6 items-center mt-6">
          {tweets.tweets.map((ele) => (
            <div
              key={ele._id}
              className="w-full max-w-3xl bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <Tweetpreview tweet={ele} userstat={true} />
            </div>
          ))}
          {channel._id==userData._id &&      <button
            onClick={uploadtweet}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Upload Tweet
          </button>}
        </div>
      )}
    </div>
  ) : (
    <h1 className="text-center text-2xl font-semibold text-red-600 mt-10">
      Loading, please wait...
    </h1>
  )
);

}

export default channel