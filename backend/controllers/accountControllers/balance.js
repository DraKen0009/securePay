import accountModel from "../../models/account.js";

const getBalance = async (req, res) => {
    const userId = req.userId;
    const data=await accountModel.findOne({ userId: userId });


    return res.status(200).json({
        'balance': data.balance
    })
}

export default getBalance