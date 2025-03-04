import mongoose, { version } from "mongoose";

const deviceSchema = new mongoose.Schema({
        details:{
        version: String,
        macAddress: String
        },
        shopId:{
            type: String,
            required : true
        },
        username:{
            type: String,
            required: true
        },    
    
})
export default mongoose.model("device_details",deviceSchema);