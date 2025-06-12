import React,{use, useRef} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {Logo} from "../index.js"
import { LogoutDB } from "../../ApiCalls/user_auth.js";
import {logout as logoutd}  from "../../store/authSlice.js"
import {insert} from "../../store/searchSlice.js"
const header=()=>{
  const status=useSelector(state=>state.auth.status)
  const dispatch=useDispatch();
  const reff=useRef();
  const navigate=useNavigate()
  const search=async ()=>{
   const  text=reff.current.value
      dispatch(insert(text))
      navigate("")
      reff.current.value=""
  }

  const login=()=>{
    navigate('/login')
  }
  const signup=()=>{
    navigate('/signup')
  }
  const logout=async()=>{
    const check=await LogoutDB();
    if(check){
         dispatch(logoutd())
    }
    navigate('/')
  }
    return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <Logo />
        <span className="text-xl font-bold text-blue-600 hidden sm:inline">Tube</span>
      </Link>

      {/* Search */}
      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-full max-w-md mx-4">
        <input
          ref={reff}
          type="text"
          placeholder="Search videos"
          className="bg-transparent outline-none flex-1 text-sm px-2"
        />
        <button
          onClick={search}
          className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-2">
        {!status ? (
          <>
            <button
              onClick={login}
              className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-600"
            >
              Login
            </button>
            <button
              onClick={signup}
              className="bg-gray-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-700"
            >
              Signup
            </button>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default header