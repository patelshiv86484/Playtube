import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import { Authlayout,Login,Signup } from './components/index.js'

//pages to be created.
import Home from './pages/home.jsx'//this is doe all videos page
import Video from "./pages/video.jsx";
import Addvideo from './pages/addvideo.jsx'
import Editvideo from "./pages/editvideo.jsx"
import Support from "./pages/support.jsx"
import Likedvideo from "./pages/likedVideo.jsx"
import Watchhistory from "./pages/watchhistory.jsx"
import Channel from "./pages/channel.jsx"
import Setting from "./pages/setting.jsx"
import Collection from "./pages/collection.jsx"
import Playlist from "./components/playListDetail.jsx"
import Admin from "./pages/admin.jsx"
import Subscription from "./pages/subscription.jsx"
import Addplaylist from './pages/addPlaylist.jsx'
import Tweetform from './components/tweetForm.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element:( 
            <Authlayout authentication={false}>
            <Home />
            </Authlayout>
             )
        },
        {
            path: "/login",
            element: (
                <Authlayout authentication={false}>
                    <Login />
                </Authlayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <Authlayout authentication={false}>
                    <Signup />
                </Authlayout>
            ),
        },
        {
            path: "/add-video",
            element: (
                <Authlayout authentication>
                    {" "}
                    <Addvideo />
                </Authlayout>
            ),
        },
        {
            path: "/edit-video/:slug",
            element: (
                <Authlayout authentication>
                    {" "}
                    <Editvideo />
                </Authlayout>
            ),
        },
        {
            path: "/video/:slug",
            element: (
                  <Authlayout authentication>
                    <Video />
                  </Authlayout>)
            
        },
        {
                path: "/liked-video",
            element: (
                  <Authlayout authentication>
                    <Likedvideo />
                  </Authlayout>)
        },
        {
                path: "/history",
            element: (
                  <Authlayout authentication>
                    <Watchhistory />
                  </Authlayout>)
        },{
              path: "/channel/:channelname",
            element: (
                  <Authlayout authentication>
                    <Channel />
                  </Authlayout>)
        },
        {
              path: "/setting",
            element: (
                  <Authlayout authentication>
                    <Setting />
                  </Authlayout>)
        }, {
              path: "/collection",
            element: (
                  <Authlayout authentication>
                    <Collection />
                  </Authlayout>)
        }, {
              path: "/playlist/:id",
            element: (
                  <Authlayout authentication>
                    <Playlist />
                  </Authlayout>)
        },{
              path: "/admin",
            element: (
                  <Authlayout authentication>
                    <Admin />
                  </Authlayout>)
        },{
              path: "/subscription",
            element: (
                  <Authlayout authentication>
                    <Subscription />
                  </Authlayout>)
        },{
              path: "/add-playlist",
            element: (
                  <Authlayout authentication>
                    <Addplaylist />
                  </Authlayout>)
        },{
              path: "/upload-tweet",
            element: (
                  <Authlayout authentication>
                    <Tweetform />
                  </Authlayout>)
        }
        ,{
            path:"/support",
            element:<Support/>
        }
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* provider for redux tool-kit and RouterProvider for react-router-dom in substitution to <App /> */}
   < Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)