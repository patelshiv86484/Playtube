import dbconnection from "./db/index.js"
import {app} from "./app.js"//not to do re-declaration as const app=express()  here as all will create their own context and middleware's like app.use(json()) is not applied in all so keep universal app variable of express() only.
// dotenv.config({     //this is not required as this scirpt in package.json (-r dotenv/config) preloads environment variable in process.env from .env file befor script runs.
// path:'/.env'
// })

//Analogy:
// Imagine a restaurant (your server):

// MongoDB is your kitchen

// Express server is your door to accept customers(  app.listen(port,()=>{} ) )

// You only want to open the doors (listen()) if your kitchen (MongoDB) is working.

dbconnection().//if mongodb atlas connection established successfully(kitchen is ready).
then(()=>{
    app.on("error",(err)=>{//this error event listener must be there before app.listen() as both are synchronous operation because if kitchen is not ready then cant open the doors to accept customer.
        console.log("App listens error: ",err)
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port number: ${process.env.PORT || 8000}`)
    })
}).
catch((err)=>{
    console.log("Error DB connection failed (in src/index) ",err)
})


/*
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(err)=>{
            console.log("Error :: ",err)
            throw error 
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App listening on port number: ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR:: ",error)
        throw error
    }
   
})()
//Immediately Invoked Async Function Expression (IIAFE).
*/