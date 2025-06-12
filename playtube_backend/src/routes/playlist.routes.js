import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createPlaylist,deletePlaylist,getUserPlaylist,getplaylistbyid} from "../controllers/playlist.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router=Router();


router.route("/getUserPlaylist/:userid").get(getUserPlaylist)

router.route("/create-playlist").post(verifyJWT,upload.single("thumbnail"),createPlaylist)
router.route("/delete-playlist/:playlistId").delete(verifyJWT,deletePlaylist)
router.route("/get-playlist/:id").get(verifyJWT,getplaylistbyid)

export default router;