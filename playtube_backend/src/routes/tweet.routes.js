import Router from "router";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {postTweet,editTweet,deleteTweet,getTweet} from "../controllers/tweet.controller.js"
const router=Router();

router.route("/post-tweet").post(verifyJWT,postTweet);
router.route("/edit-tweet/:tweetId").patch(verifyJWT,editTweet);
router.route("/delete-tweet/:tweetId").delete(verifyJWT,deleteTweet);
router.route("/get-all-tweets").post(verifyJWT,getTweet);


export default router;