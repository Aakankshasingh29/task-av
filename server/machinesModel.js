import mongoose, { Schema } from "mongoose";
const machinesSchema = new mongoose.Schema({
    shopId:{
        required : true,
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username:{
        type: String,
        required: true
    },
    distributorId:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

})
export default mongoose.model("machines",machinesSchema);