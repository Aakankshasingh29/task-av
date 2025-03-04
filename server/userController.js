import userModel from "./userModel.js";
import deviceModel from "./deviceModel.js";
import { ObjectId } from "mongodb"


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
    res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
        
      }

};

export const getUserInfo = async (req,res) => {
  try {
    const { distributorId } = req.params;
    console.log(distributorId)
    const aggregation = [
      { $match : { role : "SHOP", "parentId": distributorId} },
      {
        $lookup: {
          from: "device_details",
          let: { shopId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                $eq:  ["$shopId", "$$shopId"]                   
                },
            
              }
            }
          ],
          as: "shops_count"
        }
      
      },
      { $unwind: "$shops_count" },
      { $project: {
        role: 1,
        "username": 1,
        "shopCount": {
         "$size": {
           "$ifNull": ["$shops_count.details", 0]
         }
      
      }
    }
       
      }
    ]
    // console.log(JSON.stringify(aggregation));
    const data = await userModel.aggregate(aggregation)
    res.status(200).json(data)

    
  } catch (error) {
    console.log(error)
        res.status(500).json({error: error})
  }

}
    
  
export const getdeviceDetails = async (req,res) => {
  try {
    const { shopId } = req.params;
    const details = await deviceModel.aggregate([ 
      { $match : { shopId: new ObjectId(shopId) } },
      {
        $unwind: {
            path: '$details',
        }
    }, 
    ])
  res.status(200).json(details)
  } catch (error) {
      console.log(error)
      res.status(500).json({error: error})
      
    }
  
}