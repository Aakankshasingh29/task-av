import mongoose from "mongoose";
const machinesSchema = new mongoose.Schema({
    shopId:{
        type: String,
        required : true
    },
    username:{
        type: String,
        required: true
    },
    distributorId:{
        type:String,
        required: true
    },

})
export default mongoose.model("machines",machinesSchema);