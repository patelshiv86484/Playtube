// import React from "react";
// import { useNavigate } from "react-router-dom";
// const leftsidebar=()=>{
//     const navigate=useNavigate();
// const arr1=[
//     {
//         elem:"Home",
//         navi:"/"
//     },
//     {
//         elem:"Liked Video",
//         navi:"/liked-video"
//     },
//     {
//         elem:"History",
//         navi:"/history"
//     },
//     {
//         elem:"My content",
//         navi:"/my-content"
//     },{
//         elem:"Collections",
//         navi:"/collection"
//     },{
//         elem:"Subscribers",
//         navi:"/subscribers"
//     }
// ]

// const arr2=[
//     {
//         elem:"Support",
//         navi:"/support"
//     },{
//         elem:"Settings",
//         navi:"/setting"
//     }
// ]

//     return (
        
//         <>
//         <ul>
           
//          {arr1.map(ele=>(
//              <li key={ele.elem}>
//            <button onClick={()=>navigate(ele.navi)}>{ele.elem}</button>
//                </li>
//          ))}

//          {
//             arr2.map(ele=>(
//                 <li key={ele.elem}>
//            <button onClick={()=>navigate(ele.navi)}>{ele.elem}</button>
//                 </li>
//             ))
//          }
     
//          </ul>
//         </>
//     )
// }

// export default leftsidebar;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Leftsidebar = () => {
  const navigate = useNavigate();
  const username=useSelector(state=>state.auth?.userData?.userName)
  const arr1 = [
    { elem: "Home", navi: "/" },
    { elem: "Liked Video", navi: "/liked-video" },
    { elem: "History", navi: "/history" },
    { elem: "My content", navi: `/channel/${username}` },
    { elem: "Collections", navi: "/collection" },
    { elem: "Subscriptions", navi: "/subscription" },
  ];

  const arr2 = [
    { elem: "Support", navi: "/support" },
    { elem: "Settings", navi: "/setting" },
  ];

 return (
  <div className="p-6 w-64 min-h-screen bg-white rounded-r-lg text-gray-800 space-y-6">
    {/* Section 1 */}
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Main</h3>
      <ul className="space-y-1">
        {arr1.map((ele) => (
          <li key={ele.elem}>
            <button
              onClick={() => navigate(ele.navi)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              {/* Replace with actual icon */}
              <span className="text-blue-500">🔹</span>
              <span className="text-sm">{ele.elem}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>

    <hr className="border-gray-200" />

    {/* Section 2 */}
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Settings</h3>
      <ul className="space-y-1">
        {arr2.map((ele) => (
          <li key={ele.elem}>
            <button
              onClick={() => navigate(ele.navi)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              {/* Replace with actual icon */}
              <span className="text-blue-500">⚙️</span>
              <span className="text-sm">{ele.elem}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);


};

export default Leftsidebar;
