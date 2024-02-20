import {z} from "zod";
import userModel from "../../models/users.js";

const JWT_SECRET = process.env.JWT_SECRET


const updateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional()
})

const userUpdate = async (req, res) => {
    const {success} = updateSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Invalid input"
        })
    }
    const {data} = updateSchema.safeParse(req.body)

    const userId = req.userId;
    const result = await userModel.findOneAndUpdate({id: userId}, data)
    if (!result) {
        return res.status(404).json({
            msg: "User not found"
        })
    }
    return res.status(200).json({
        msg: "User updated successfully",
    })


}


export default userUpdate;