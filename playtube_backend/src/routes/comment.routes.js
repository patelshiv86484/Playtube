import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { postComment,deleteComment,getAllComments } from "../controllers/comment.controller.js";
const router=Router();

router.route("/post-comment/:videoId").post(verifyJWT,postComment)
router.route("/delete-comment/:commentId").post(verifyJWT,deleteComment)
router.route("/get-all-comments").get(verifyJWT,getAllComments)

export default router;