import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express()


//parsing req.body data using app.use()  ---> middleware function for setting middleware.
//app.use(cors()) Enable CORS for defined origins.
// app.use(cors({
//     origin:process.env.CORS_ORIGIN ,//limits to specific origins only
//     credentials:true,// Allow frontend to send and receive cookies & HTTP authentication
// }))

//for solving cold start issue
const allowedOrigin = process.env.CORS_ORIGIN;

app.use(cors((req, callback) => {
    let corsOptions;
    if (req.path === '/ping') {
        corsOptions = { origin: true }; // Allow all origins for /ping
    } else {
        corsOptions = {
            origin: allowedOrigin,
            credentials: true
        };
    }
    callback(null, corsOptions);
}));
app.use(express.json({limit:"16kb"}));//parse incoming request bodies as JSON(because When a client sends data to the server, even if it's in JSON format, the payload (the body of the HTTP request) is transmitted as a string.), but with a size limit on the body as 16kb.
app.use(express.urlencoded({extended:true,limit:"16kb"}));//express.urlencoded() middleware will parse the incoming URL-encoded data, converting it into a JavaScript object that can be easily accessed using req.body.
app.use(express.static("public"))//store favicon and files folder in public(local storage).
app.use(cookieParser());//this will allow user and server to perform CRUD operation on cookies in user browser and allows to use .cookie().

//routes import
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
//routes declaration

app.use("/api/v1/users",userRouter);//here instead of app.get(route,controller) this middleware is used because all are in different folders. 
app.use("/api/v1/videos",videoRouter);//here instead of app.get(route,controller) this middleware is used because all are in different folders. 
app.use("/api/v1/comments",commentRouter);
app.use("/api/v1/likes",likeRouter);
app.use("/api/v1/playlists",playlistRouter);
app.use("/api/v1/tweets",tweetRouter);
app.use("/api/v1/subscriptions",subscriptionRouter);
export {app}  //export this everywhere not to do re-declaration as const app=express()  in other files as all will create their own context and middleware's like app.use(json()) is not applied in all  so keep universal app variable of express() only.