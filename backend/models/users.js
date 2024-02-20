import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import bcrypt from "bcrypt";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

});

userSchema.plugin(AutoIncrement, {inc_field: 'id'});

userSchema.methods.createHash = async function (plainTextPassword) {

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);


};

userSchema.methods.validatePassword = async function (candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};


const userModel = new mongoose.model('User', userSchema);


export default userModel