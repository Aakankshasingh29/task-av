import userModel from "./userModel.js";

export const getUsers = async (req,res) => {
    try {
    const data = await userModel.aggregate([ 
        { $match : { role : "DISTRIBUTOR" } },
        
        {
            $lookup: {
              from: "users",
              let: { distributorId:{ $toString: "$_id"}  },
              pipeline: [
                {
                  $match: {
                    $expr: {
   					$eq:  ["$parentId", "$$distributorId"]                   
                    },
                    role: "SHOP"
                  }
                }
              ],
              as: "shop-count"
            }
          },
          
        { $project: {
          "username": 1,
          "shopCount": {
           "$size": {
             "$ifNull": ["$shop-count", 0]
           }
         },
        }}
      ]) 
      console.log(data)
    res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
        
    }
   
};
    
  
   
// export const userId = async (req,res) => {
//     try {
//         const id = req.params.id;
//         const userExist = await user.findbyId(id);
//         if(!userExist){
//             return res.status(404).json({msg: "user not found"})
//         }
//         res.status(200).json(userExist)
//     } catch (error) {
//         res.status(500).json({error: error})
//     }
    
// }

// export const deleteUser = async (req,res) => {
//     try {
//         const id = req.params.id;
//         const userExist = await user.findbyId(id);
//         if(!userExist){
//             return res.status(400).json({msg: "user not exist"})
//         }
//         await user.findByIdAndDelete(id);
//         res.status(200).json({msg: "user deleted sucessfully"})
//     } catch (error) {
//         res.status(500).json({error: error})
//     }
    
// }