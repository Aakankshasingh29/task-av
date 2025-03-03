import mongoose, { version } from "mongoose";

const deviceSchema = new mongoose.Schema({
    version:{
        type: Number,
        required: true
    },
    macAddress:{
        type: mongoose.Schema.Types.Mixed,
        required: true

    }
})
export default mongoose.model("device",deviceSchema);