import React ,{useState,useEffect}from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Protected({children,authentication=true}) {//If authentication is true (meaning the component expects the user to be authenticated)
    const navigate=useNavigate();
    const status=useSelector(state=>state.auth.status)
    const [loader,setLoader]=useState(true)
    useEffect(()=>{//this useEffect will run .On initial render and whenever we navigate to path which is wrapped by authlayout

        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

//let authValue = authStatus === true ? true : false
           if(authentication && authentication !== status){//if Authentication is required and user is not authenticated then navigate them to login page to get authenticated
            navigate('/login'); 
           }
           else if(!authentication && authentication!==status){//You want to navigate to the homepage ("/") when the user should be logged out (!authentication) but according to react state user is active.
            navigate('/');      //home page
           }
           setLoader(false);
    },[status,navigate,authentication])//navigate is included in the dependency array not because the act of navigating causes the effect to run, but because when a new instance of AuthLayout is mounted (due to navigation to a different route that uses AuthLayout)
  return loader?<h1>...loading</h1> : <>{children}</>
}