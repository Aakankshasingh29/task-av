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
          role: 1,
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
    
  
  