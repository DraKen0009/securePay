import {string, z} from 'zod';
import accountModel from "../../models/account.js";
import mongoose from "mongoose";

const transferSchema = z.object({
    amount: z.string(),
    to: z.string()
})

const transferAmount = async (req, res, next) => {
    const {success} = transferSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "Invalid inputs"
        });
    }

    const {to, amount} = transferSchema.safeParse(req.body)['data'];

    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        const toAccount = await accountModel.findOne({userId: to}).session(session);
        if (!toAccount) {
            throw new Error("Account not found");
        }

        const userAccount = await accountModel.findOne({userId: req.userId}).session(session);

        if (amount > userAccount.balance) {
            throw new Error("Insufficient Balance");
        }

        await accountModel.updateOne(
            {userId: req.userId},
            {$inc: {balance: -amount}},
            {session}
        );

        await accountModel.updateOne(
            {userId: to},
            {$inc: {balance: amount}},
            {session}
        );

        await session.commitTransaction();

        return res.status(200).json({
            msg: "Transaction is successful"
        });
    } catch (error) {
        await session.abortTransaction();

        let errorMessage = "Transaction failed";
        if (error instanceof mongoose.Error.ValidationError) {
            errorMessage = "Invalid input data";
        } else if (error.message === "Account not found") {
            errorMessage = "The recipient account does not exist";
        } else if (error.message === "Insufficient Balance") {
            errorMessage = "Insufficient funds in your account";
        } else {
            errorMessage = "Server Errror"
        }

        return res.status(500).json({
            msg: errorMessage
        });

    } finally {
        await session.endSession(); // Always end the session
    }
};


export default transferAmount;