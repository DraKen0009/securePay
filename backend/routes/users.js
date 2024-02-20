import express from "express";
import userSignup from "../controllers/userControllers/signup.js";
import userSignIn from "../controllers/userControllers/signin.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import userUpdate from "../controllers/userControllers/update.js";
import filterUsers from "../controllers/userControllers/filter.js";


const router = express.Router()

router.post('/signup', userSignup)
router.post('/signin', userSignIn)
router.put('/update', authMiddleware, userUpdate)
router.get('/bulk', filterUsers)

export default router