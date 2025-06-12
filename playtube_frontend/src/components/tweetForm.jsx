import React from "react";
import { useForm } from "react-hook-form";
import {Input} from "../components/index"
import { createTweet } from "../ApiCalls/tweet.js";
const  tweetform=()=>{ 
   const {register,handleSubmit}=useForm()

   const submit=async(data)=>{
        const d1=await createTweet(data.content)
         window.history.back()
   }
    // return (
    //     <>
    //     <form onSubmit={handleSubmit(submit)}>
    //      <Input 
    //        type="text"
    //        label="Enter tweet"
    //        placeholder="Enter tweet"
    //        {...register("content")}
    //       />
    //      <button type="submit" >Upload tweet</button>
    //       </form>
    //     </>
    // )

    return (
  <>
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter tweet
        </label>
        <Input
          type="text"
          placeholder="What's on your mind?"
          {...register("content")}
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
      >
        Upload Tweet
      </button>
    </form>
  </>
);

}


export default tweetform