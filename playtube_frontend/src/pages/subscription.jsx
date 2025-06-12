import React, { useEffect,useState } from "react";
import { getSubscribedTo,unsubscribe } from "../ApiCalls/subscription";
import { getUserById } from "../ApiCalls/user_auth";
const subscription=()=>{
    const [subscription,setSubscription]=useState([]);
useEffect(()=>{
   const fetchdata=async()=>{
       const res=await getSubscribedTo()
      const result= await Promise.all(  res.data.map(async ele=>{
         return await getUserById(ele.channel)
      }))
      setSubscription(result)
   }
   fetchdata();
},[])
async function unsub(ele){
  await unsubscribe(ele._id)
  window.location.reload();

}
//     return (
//         subscription?
//     <>
//      <div>

//       {
//         subscription.map(ele=>{
//             return (


//             <div key={ele.data._id} > 
//                   <img src={ele.data.avatar} alt="Avatar" />
//                   <div>{ele.data.userName}</div>
//                    <button onClick={()=>unsub(ele.data)}>Unsubscribe</button>
//             </div>)
//         })
//       }

//      </div>
//     </>:
//     <h1>Loading</h1>
// )

return (
  subscription ? (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {subscription.map((ele) => (
        <div
          key={ele.data._id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center space-x-4">
            <img
              src={ele.data.avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full border object-cover"
            />
            <span className="text-gray-800 font-medium">{ele.data.userName}</span>
          </div>

          <button
            onClick={() => unsub(ele.data)}
            className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600"
          >
            Unsubscribe
          </button>
        </div>
      ))}
    </div>
  ) : (
    <h1 className="text-center text-xl font-semibold text-gray-700">Loading...</h1>
  )
);

}

export default subscription