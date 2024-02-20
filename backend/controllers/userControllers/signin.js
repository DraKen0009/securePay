import {z} from "zod";
import userModel from "../../models/users.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET


const signInSchema = z.object({
    username: z.string().email(),
    password: z.string()
})

const userSignIn = async (req, res) => {
    const {success} = signInSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            'msg': "invalid credentials"
        })
    }

    const {data} = signInSchema.safeParse(req.body);

    const user = await userModel.findOne({username: data.username});
    if (!user) {
        return res.status(404).json({
            'msg': "user not found"
        })
    } else {
        if (await user.validatePassword(data.password, user.password)) {

            const token = jwt.sign({
                id: user.id,
                username: user.username

            }, JWT_SECRET, {expiresIn: '6h'});

            res.status(200).json({
                msg: "logged in successfully",
                token: token
            });
        } else {
            return res.status(401).json({
                msg: "Incorrect Password",
            });
        }


    }
}

export default userSignIn;
