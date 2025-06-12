import { Router } from "express";
import {totalviews,
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    getUserVideos,
    videosById,
    videoDetailAdmin,
    toggle
} from "../controllers/video.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router=Router();

router.route("/getAllVideos").get(getAllVideos);
router.route("/uploadVideo").post(
    upload.fields([
        {
            name:"videoFile",
            maxCount:1,
        },
        {
            name:"thumbnail",
            maxCount:1,
        }
    ]),verifyJWT,publishAVideo
)

router.route("/getvideo/:videoId").get(verifyJWT,getVideoById)
router.route("/getUserVideo/:userid").get(getUserVideos)

//Secured routes.
router.route("/updateVideo/:videoId").post(verifyJWT,updateVideo) 
router.route("/deleteVideo/:videoId").delete(verifyJWT,deleteVideo) 
router.route("/videosById").post(verifyJWT,videosById) 
router.route("/totalviews").get(verifyJWT,totalviews) 
router.route("/admin-video-detail").get(verifyJWT,videoDetailAdmin) 
router.route("/toggle").post(verifyJWT,toggle) 
export default router; 