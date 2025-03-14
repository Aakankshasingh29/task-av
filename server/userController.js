import userModel from "./userModel.js";
import deviceModel from "./deviceModel.js";
import { ObjectId } from "mongodb"
// import { connection } from "mongoose";


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

export const getCounts = async (req,res) =>{
  try {
    const counts = await userModel.aggregate([ 
        
        // {
        //     $lookup: {
        //       from: "users",
        //       let: { distributorId:{ $toString: "$_id"}  },
        //       pipeline: [
        //         { "$match": { "$expr": { "$in": [ "$_id", "distributorId" ] } } }
        //       ],
        //       as: "shop-counts"
        //     }
        //   },
         
          {
            $lookup: {
              from: "users",
              pipeline: [
                {
                  $match: {
                    role: "SHOP",
                    parentId: "664c5e7127f0b76c502b0cbd"
                  }
                },
              ],
              as: "shops"
            }
          },
          
          {
            $addFields: {
              "shopIds"  : {
                $map: {
                  input: "$shops",
                  as: "shopId",
                  in:  "$$shopId._id"          
              }
           }
            }
          },
          {
            $group: {
              _id: "$shopIds"
            }
          },
          {
            $lookup:{
              from:"users",
              let: { shopIds: "$shopIds"},
              pipeline:[
                {
                  $match:{
                    role:"CASHIER",
                    $expr: {
                      $and : {
                        $in: ["$parentId", "$$shopIds"]
                      }
                    }
                  }
                }
              ],
              as: "cashiers"
            }

          },
          // {
          //   $lookup: {
          //     from: "users",
          //     let: {
          //       parentId: { $toObjectId: "$SHOPS.Id" },
          //       items: "$items"
          //     },
          //     pipeline: [
          //       { $match: { $expr: { $eq: ["$_id", "$$itemId" ] } } },
          //       { $replaceRoot: { newRoot: { $mergeObjects: ["$$items", "$$ROOT"] } } }
          //     ],
          //     as: "items"
          //   }
          // },         
          {
              $project: {
                "shopIds"  : 1,
                "cashiers": 1,
                // "shopCount": {
                //   "$size": {
                //     "$ifNull": ["$shopIds", 0]
                //   }
                // },
              }
           }]
          )
          res.status(200).json({counts})
  }

    catch (error) {
      console.log(error)
          res.status(500).json({error: error})
    }
}

  
         

  