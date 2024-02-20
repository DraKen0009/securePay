import userModel from "../../models/users.js";


const filterUsers = async (req, res) => {
    try {
        const {filter} = req.query;
        const regexSearchTerm = new RegExp(filter, 'i');

        const filteredUsers = await userModel.find({
            $or: [
                {firstName: {$regex: regexSearchTerm}},
                {lastName: {$regex: regexSearchTerm}}
            ]
        });


        return res.json({
            users: filteredUsers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};


export default filterUsers;