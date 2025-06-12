import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import {LogoutDB} from '../../ApiCalls/user_auth'
function Logoutbtn() {
  
    const disp=useDispatch();

    function handlelogout(){
        LogoutDB().
        then(()=>{
        disp(logout())//if successfully logout from database then only logout from store.
        }

      )
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'  onClick={handlelogout}>
    Logout
    </button>
  )
}

export default Logoutbtn