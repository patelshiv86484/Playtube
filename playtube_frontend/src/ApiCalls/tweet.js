 import axios from "axios"
     
     async function createTweet (content) {
        try {
            const tweet= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tweets/post-tweet`,{
                content,
            },{
                withCredentials:true,
            })
            return tweet.data
        }
        catch (error) {
            console.log("Error in creating tweet in frontend /database/js",error)
        }
    }  
     async function updateTweet ({content,tweetId}) {
        try {
  const updtweet= await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/tweets/edit-tweet/${tweetId}`,{
                content
            },{
                withCredentials:true,
            })
            return updtweet.data
        }
        catch (error) {
            console.log("Error in updateing tweet in frontend /database/js",error)
        }
    }  
     async function deleteTweet (tweetId) {
        try {
            const deltweet= await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tweets/delete-tweet/${tweetId}`,{
                withCredentials:true,
            })
            return deltweet.data
        }
        catch (error) {
            console.log("Error in deleting tweet in frontend /database/js",error)
        }
    }  
     async function getAllTweet (userId) {
        try {
            const hist= await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tweets/get-all-tweets`,{
                userId
            },{
                withCredentials:true,
            })
            return hist.data
        }
        catch (error) {
            console.log("Error in fetching history in frontend /database/js",error)
        }
    }  


    export {createTweet,updateTweet,deleteTweet,getAllTweet}