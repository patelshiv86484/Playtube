import { Router } from "express";
import {postLike,geAllLikes,removeLike,likedVideoByUser,likescount} from "../controllers/like.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router();

router.route("/post-like/:varId").post(verifyJWT,postLike)
router.route("/get-likes/:varId").post(verifyJWT,geAllLikes)
router.route("/dislike/:varId").post(verifyJWT,removeLike)
router.route("/likedVideoByUser").get(verifyJWT,likedVideoByUser)
router.route("/getlikescount/:userName").post(verifyJWT,likescount)

export default  router;