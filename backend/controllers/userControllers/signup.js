import {z} from "zod";
import userModel from "../../models/users.js";
import jwt from "jsonwebtoken";
import accountModel from "../../models/account.js";

const JWT_SECRET = process.env.JWT_SECRET


const signupSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

const userSignup = async (req, res) => {
    const {success} = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "User already exist/ Invalid input"
        })
    }
    const {data} = signupSchema.safeParse(req.body)

    if (await userModel.findOne({username: data.username})) {
        return res.status(411).json({
            msg: "User already exist"
        })
    }

    const newUser = await userModel({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName
    })

    newUser.password = await newUser.createHash(data.password);

    await newUser.save();

    await newUser.save();

    const userId = newUser.id;

    await accountModel.create({
        userId,
        balance: parseInt(1 + Math.random() * 10000)
    })


    const token = jwt.sign({
        id: userId,
        username: newUser.username
    }, JWT_SECRET, {expiresIn: '6h'});

    res.status(201).json({
        msg: "User created",
        user: newUser,
        token: token
    })

}


export default userSignup;