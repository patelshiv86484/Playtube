import axios from "axios";

async function subscribe(owner){
    try{
     const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/subscriptions/subscribe`,{
                 owner
            },{
                withCredentials:true,
            })
            return getteddata.data;
    } 
    catch(error){
   console.log("Error while subscribing to channel in subscriber.js")
    }
}
async function unsubscribe(owner){
  try{
       const getteddata=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/subscriptions/unsubscribe`,{
                 owner
            },{
                withCredentials:true,
            })
            return getteddata.data;
    }
    catch(error){
   console.log("Error while unsubscribing to channel in subscriber.js")
    }
}
async function getSubscribers(){
     try{
       const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/subscriptions/getsubscribers`, {
                withCredentials:true,
            })
            return getteddata.data;
    }
    catch(error){
   console.log("Error while getting subscribers  in subscriber.js",error)
    }
}

async function getSubscribedTo(){
     try{
       const getteddata=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/subscriptions/getsubscribedto`, {
                withCredentials:true,
            })
            return getteddata.data;
    }
    catch(error){
   console.log("Error while getting subscribedto  in subscriber.js",error)
    }
}
export {subscribe,unsubscribe,getSubscribers,getSubscribedTo}