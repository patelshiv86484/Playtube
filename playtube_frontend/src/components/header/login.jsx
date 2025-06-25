import React,{useState} from 'react'//useState is used for getting error.
import {useNavigate,Link} from 'react-router-dom';//link is used for goint to signup page if account is not there and useNavigate is used to go to home page once logged in for watching posts.
import {login as authlogin} from '../../store/authSlice.js'
import {useDispatch} from 'react-redux'
import {Logo,Input} from '../index.js'
import {useForm} from 'react-hook-form'//          IMPORTANT.
import {LoginDB,getcurrentuser} from '../../ApiCalls/user_auth.js'

function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm({
      defaultValues:{
        email: 'playtube.default@gmail.com',
        psswrd: 'default123'
      }
    });//instead of handling state manually register will keep track of all of this by passing method to handlesubmit().
    const [error,setError] =useState("");
    const login=async (data)=>{
      setError("");
      //console.log(data);//---------------------------------->check this in console log to understand react hook form<----------------------------------.
     try {
       const session=await LoginDB(data);//this will create session of log in user with sessionid,expiration-time,etc..
       if(session){
         const userdata= await getcurrentuser();//this will give active user from exitign session.
         if(userdata){
            dispatch(authlogin(userdata.data));
            navigate('/');
         }
       }
     } catch (error) {
        setError(error.message);
     }
    }
    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight"></h2>
            <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>                       
            </p>
              {error && <p className="text-red-600 mt-8 text-center"> {error} </p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                     <Input
                     label="E-mail: "
                     type="email"
                     placeplaceholder="Enter your email address"//this is not accepted in input component but due to ...props this are spreaded.
                     {...register('email',{//keep email(key) as unique for each Input tag.This name will be used as the key in the form data object. 
                      //use data.email to access this input field filled data in login();      
                      required:true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })
                     }
                     />
                     <Input 
                     type="password"
                     label="password"
                     placeplaceholder="Enter your password"
                     {...register('psswrd',{
                        required:true,
                     })}
                     />
                     {/* <Btn
                     children="Submit"
                     type="Submit"
                     className='w-full'
                     /> */}
                     <button type='submit' className='w-full'> Submit</button>
                </div> 
            </form>
            </div>
        </div>
  )
}
export default Login