import {subscribe,unsubscribe,getsubscribers,getsubscribedto} from "../controllers/subscription.controller.js"
import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router=Router();

router.route('/subscribe').post(verifyJWT,subscribe)
router.route('/unsubscribe').post(verifyJWT,unsubscribe)
router.route('/getsubscribers').get(verifyJWT,getsubscribers)//noused
router.route('/getsubscribedto').get(verifyJWT,getsubscribedto)

export default router;