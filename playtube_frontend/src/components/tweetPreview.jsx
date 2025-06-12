import React,{useEffect,useState,useRef} from "react";
import { getUserById } from "../ApiCalls/user_auth";
import {geAllLikes,postLike,removeLike } from "../ApiCalls/like.js";
import {updateTweet,deleteTweet}  from "../ApiCalls/tweet"
import moment from 'moment';

const tweetPreview=({tweet,userstat=false})=>{
    const [loader,setLoader]=useState(true)
    const [owner,setOwner]=useState({})//this is required as cant overwrite tweet.owner=user.data this gives error on re rendering
    const [likes,setLikes]=useState()
    const reff=useRef();
    useEffect(()=>{
    const fetchdata=async()=>{
        setLoader(true)
    const user=await getUserById(tweet.owner)
    const lik=await geAllLikes({id:tweet._id,idNumber:3})
    setLikes(lik)
    setOwner(user.data)
      setLoader(false)
    }
    fetchdata();
  },[])
 async function del(){
       await deleteTweet(tweet._id)
      window.location.reload();
 }
 async function upd(){
  const content=reff.current.value;
     await updateTweet({content,tweetId:tweet._id});
     reff.current.value
 }
  const like=async ()=>{
         const gen=await postLike({id:tweet._id,idNumber:3})
         const like=await geAllLikes({id:tweet._id,idNumber:3})
         setLikes(like);
       }
       const dislike=async ()=>{
         const gen=await removeLike({id:tweet._id,idNumber:3})
         const like=await geAllLikes({id:tweet._id,idNumber:3})
         setLikes(like);
       }
    // return (
    //     !loader?
    // <>
    // <img src={tweet.owner.avatar} alt="Avatar" />
    // <div>{moment(tweet.createdAt).fromNow()}</div>
    //    <div>{owner.userName} </div>
    //    <div>{userstat ?  <input type="text" defaultValue={tweet.content} ref={reff} />  :tweet.content}</div>
    //    {userstat && <button onClick={del} >Delete</button> }
    //    {userstat && <button onClick={upd} >Update</button> }
    // </>:
    // <h1>Loading</h1>
    // )

    return (
  !loader ? (
    <div className="flex p-4 bg-white rounded-xl shadow-md max-w-4xl mx-auto items-start space-x-6">
      
      {/* Owner Section - Left */}
      <div className="w-1/4 flex flex-col items-center space-y-2">
        <img
          src={owner.avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full border"
        />
        <div className="text-center">
          <p className="text-gray-900 font-semibold">{owner.userName}</p>
          <p className="text-sm text-gray-500">{moment(tweet.createdAt).fromNow()}</p>
        </div>
      </div>

      {/* Content Section - Center */}
      <div className="w-3/4 flex flex-col space-y-4">
        <div>
          {userstat ? (
            <input
              type="text"
              defaultValue={tweet.content}
              ref={reff}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-800 text-lg">{tweet.content}</p>
          )}
        </div>
        {!userstat && (
           <div className="space-x-4 my-4">
  <button  onClick={ likes.data. isLiked ? dislike :like} className="bg-black text-white px-4 py-2 text-xl rounded hover:bg-gray-800 transition">
    👍 {likes?.data?.count || 0}
  </button>
</div>
        )}
        {/* Buttons */}
        {userstat && (
          <div className="flex space-x-4">
            <button
              onClick={del}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 text-sm"
            >
              Delete
            </button>
            <button
              onClick={upd}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-sm"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <h1 className="text-center text-xl font-semibold text-gray-700">Loading...</h1>
  )
);

}


export default tweetPreview