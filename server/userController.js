import userModel from "./userModel.js";

export const getUsers = async (req,res) => {
    try {
        const userData = await user.find();
    console.log(userData)
    if(!userData){
        return res.status(404).json({msg: "users data not found"})
    }
    res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({error: error})
        
    }

    
}
export const userId = async (req,res) => {
    try {
        const id = req.params.id;
        const userExist = await user.findbyId(id);
        if(!userExist){
            return res.status(404).json({msg: "user not found"})
        }
        res.status(200).json(userExist)
    } catch (error) {
        res.status(500).json({error: error})
    }
    
}

export const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        const userExist = await user.findbyId(id);
        if(!userExist){
            return res.status(400).json({msg: "user not exist"})
        }
        await user.findByIdAndDelete(id);
        res.status(200).json({msg: "user deleted sucessfully"})
    } catch (error) {
        res.status(500).json({error: error})
    }
    
}