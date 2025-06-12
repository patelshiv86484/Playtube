import { useState,useEffect } from 'react'
import {useDispatch} from "react-redux"

import {getcurrentuser} from '../src/ApiCalls/user_auth.js'
import {login,logout} from "..//src/store/authSlice.js"
import {Header,Leftsidebar} from  "../src/components/index.js"//here if  /index  is not written then also it works correctly.

import {Outlet} from "react-router-dom"
import './App.css'

function App() { 
  const [loading,setLoading] =useState(true)
  const disp=useDispatch();
  
  useEffect(() => {
   getcurrentuser().//if refreshing or coming back to website without logout will loginus again by storing our session.
   then((userdata)=>{
    // console.log(userdata.data.data)
      if(userdata) disp(login(userdata.data));
      else disp(logout())
   })
   .finally(()=>{
    setLoading(false);
   })
  }, [])
  

//  return !loading?(
//   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
//     <div className='w-full block'>
//       <Header />
//       <main>
//       <Outlet />
//       </main>
//       <Leftsidebar />
//     </div>
//   </div>
// ) :null

return !loading ? (
  <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Header at the top */}
    <div className="w-full shadow-md">
      <Header />
    </div>

    {/* Content area: Sidebar + Main */}
    <div className="flex flex-1">
      {/* Sidebar on the left */}
      <div className="w-1/5 bg-white shadow-md">
        <Leftsidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
) : null;


}

export default App