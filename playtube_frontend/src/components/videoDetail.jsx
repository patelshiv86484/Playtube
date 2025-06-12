import React,{useEffect, useRef,useState} from "react";
import { getVideo,deleteVideo } from "../ApiCalls/video";
import { getUserById,getChannelDetails } from "../ApiCalls/user_auth.js";
import { postComment,getComments } from "../ApiCalls/comment.js";
import {geAllLikes,postLike,removeLike } from "../ApiCalls/like.js";
import { useSelector } from "react-redux";
import {subscribe as subscribed,unsubscribe}  from "../ApiCalls/subscription.js"
const  videoDetail= ({videoid})=>{
     const [owner,setOwner]=useState()
     const [video,setVideo]=useState()
     const [channeldetails,setChanneldetails]=useState()
     const [likes,setLikes]=useState()
     const [allcomments,setAllcomments]=useState()
     const [commentUser,setCommentuser]=useState([])
     
     const status=useSelector(state=>state.auth.status)
     const User=useSelector(state=>state.auth.userData)
     const reff=useRef();

     const postcomment=async ()=>{
        await postComment({content:reff.current.value , videoId:videoid})
        reff.current.value="";
        const allcomments=await getComments({videoid})
        setAllcomments(allcomments)
    }

  

     //useEffect for await
    useEffect( ()=>{
      const fetchdata=async ()=>{
    const video=await getVideo(videoid)
   
    const owner=await getUserById(video.data.owner)
    const channeldetails=await getChannelDetails(owner.data.userName)
    const like=await geAllLikes({id:videoid,idNumber:1})
    const allcomments=await getComments({videoid})//allcomment.total and allcomments.comments(array)
    console.log(video.data)
    setVideo(video)
    setOwner(owner)
    setChanneldetails(channeldetails)
    setAllcomments(allcomments)
    setLikes(like);
      }
       fetchdata();
    },[videoid])

    useEffect(()=>{
      setCommentuser([]);
        const fetchData=async ()=>{
          if(!allcomments?.data.comments) return; 
          const combined=  await Promise.all(
            allcomments.data.comments.map(async cmnt=>{
              const user=await getUserById(cmnt.owner);
              return {...cmnt,user};
            })
          )
          setCommentuser(combined);
        }
        fetchData();
      },[allcomments])

      const subscribe=async()=>{
        if(!channeldetails.data.isSubscribed){
            const gen=await subscribed(owner.data._id)
             const channeldetails=await getChannelDetails(owner.data.userName)
             setChanneldetails(channeldetails)
        }
        else {
         const gen=await unsubscribe(owner.data._id)
          const channeldetails=await getChannelDetails(owner.data.userName)
           setChanneldetails(channeldetails)
        }
      }
      const like=async ()=>{
        const gen=await postLike({id:videoid,idNumber:1})
        const like=await geAllLikes({id:videoid,idNumber:1})
        setLikes(like);
      }
      const dislike=async ()=>{
        const gen=await removeLike({id:videoid,idNumber:1})
        const like=await geAllLikes({id:videoid,idNumber:1})
        setLikes(like);
      }
      const removevid=async()=>{
        await deleteVideo(videoid)
        window.history.back();
      }
//     return (
//   <>
//     {!video || !owner || !channeldetails ? (
//       <h1>Loading...</h1>
//     ) : (
//       <>
//            <div>
//       <video
//         width="100%"
//         height="auto"
//         controls
//         autoPlay={false} // optional
//         muted={false} // optional
//       >
//         <source src={video.data.videoFile} type="video/mp4" />
//       </video>
//     </div>
//         <div>{video.data.title}</div>
//         <div>{video.data.views}</div>
//         <div>{video.data.createdAt}</div>
//         <div>{video.data.likes}</div>
//         <div>{video.data.dislikes}</div>
//         <div><img src={owner.data.avatar} alt="Avatar" /></div>
//         <div>{owner.data.username}</div>
//         <div>{channeldetails.data.subscribersCount}</div>

//         {channeldetails.data.isSubscribed ? (
//           <button  >Unsubscribe</button>
//         ) : (
//           <button>Subscribe</button>
//         )}

//         <div>{video.data.description}</div>

//         {/* Comments Section */}
//         {status && (
//           <>
//             <input placeholder="Add a comment" ref={reff} />
//             <button onClick={postcomment}>Post Comment</button>
//           </>
//         )}

//         {commentUser.map((cmt) => (
//           <div key={cmt._id}>
//             <img src={cmt.user.avatar} alt="" />
//             <div>{cmt.user.username}</div>
//             <div>{cmt.createdAt}</div>
//             <div>{cmt.content}</div>
//           </div>
//         ))}
//       </>
//     )}
//   </>
// );

return (
  <>
    {!video || !owner || !channeldetails ? (
      <h1 className="text-center text-2xl font-bold text-gray-700 mt-10">Loading...</h1>
    ) : (
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Video Player */}
     <div className="w-full max-w-md">
  <video
    width="100%"
    height="240"
    controls
    className="rounded-md shadow border"
  >
    <source src={video.data.videoFile} type="video/mp4" />
  </video>
  {User._id==owner.data._id && 
  <button onClick={removevid}>Remove video</button> }
</div>


        {/* Video Details */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{video.data.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{video.data.views} views</span>
            <span>{new Date(video.data.createdAt).toLocaleDateString()}</span>
            <div className="space-x-4 my-4">
  <button  onClick={ likes.data.isLiked ? dislike :like} className="bg-black text-white px-4 py-2 text-xl rounded hover:bg-gray-800 transition">
    👍 {likes?.data?.count || 0}
  </button>
</div>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex items-center justify-between border-t border-b py-4">
          <div className="flex items-center space-x-4">
            <img
              src={owner.data.avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{owner.data.username}</div>
              <div className="text-sm text-gray-500">
                {channeldetails.data.subscribersCount} subscribers
              </div>
            </div>
          </div>
          <button onClick={subscribe} className={`px-6 py-2 rounded-full font-semibold text-white tracking-wide shadow-md transition-colors duration-200
  ${channeldetails.data.isSubscribed ? 'bg-gray-700 hover:bg-gray-800' : 'bg-red-600 hover:bg-red-700'}`}>
            {channeldetails.data.isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>

        {/* Description */}
        <div className="bg-gray-100 p-4 rounded-lg text-gray-800">
          {video.data.description}
        </div>

        {/* Comment Input */}
        {status && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input
              placeholder="Add a comment"
              ref={reff}
              className="flex-1 border px-4 py-2 rounded w-full"
            />
            <button
              onClick={postcomment}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Post Comment
            </button>
          </div>
        )}

        {/* Comments */}
        <div className="space-y-4">
          {commentUser.map((cmt) => (
            <div key={cmt._id} className="flex items-start gap-3 p-3 bg-white shadow-sm rounded">
              <img
                src={cmt.user.data.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{cmt.user.username}</div>
                <div className="text-xs text-gray-500 mb-1">
                  {new Date(cmt.createdAt).toLocaleString()}
                </div>
                <div>{cmt.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);


   
}

export default videoDetail