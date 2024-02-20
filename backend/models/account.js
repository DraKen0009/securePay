import mongoose from 'mongoose';


const accountSchema = new mongoose.Schema({
    userId: {
        type: Number,
        ref: 'userModel',
        required: true
    },
    balance:{
        type: Number,
        min: 0,
        required: true
    }

});



const accountModel = new mongoose.model('Account', accountSchema);


export default accountModel