import userModel from "./userModel.js";
import deviceModel from "./deviceModel.js";
import machinesModel from "./machinesModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types
// import { connection } from "mongoose";


export const getUsers = async (req, res) => {
  try {
    const data = await userModel.aggregate([
      { $match: { role: "DISTRIBUTOR" } },

      {
        $lookup: {
          from: "users",
          let: { distributorId: { $toString: "$_id" } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$parentId", "$$distributorId"]
                },
                role: "SHOP"
              }
            }
          ],
          as: "shop-count"
        }
      },

      {
        $project: {
          "username": 1,
          role: 1,
          "shopCount": {
            "$size": {
              "$ifNull": ["$shop-count", 0]
            }
          },
        }
      }
    ])
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })

  }

};

export const getUserInfo = async (req, res) => {
  try {
    const { distributorId } = req.params;
    console.log(distributorId)
    const aggregation = [
      { $match: { role: "SHOP", "parentId": distributorId } },
      {
        $lookup: {
          from: "device_details",
          let: { shopId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$shopId", "$$shopId"]
                },

              }
            }
          ],
          as: "shops_count"
        }

      },
      { $unwind: "$shops_count" },
      {
        $project: {
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
    res.status(500).json({ error: error })
  }

}


export const getdeviceDetails = async (req, res) => {
  try {
    const { shopId } = req.params;
    const details = await deviceModel.aggregate([
      { $match: { shopId: new ObjectId(shopId) } },
      {
        $unwind: {
          path: '$details',
        }
      },
    ])
    res.status(200).json(details)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })

  }

}

export const getCounts = async (req, res) => {
  try {
    const { distributorId } = req.params;
    const aggregatep = [
      {
        $match: {
          role: "SHOP",
          parentId: distributorId
        }
      },
      {
        $group: {
          _id: null,
          shopIds: {
            $push: "$_id"
          }
        }
      },
      {
        $project: {
          _id: 0
        }
      },
    ]
    const shopCount = await userModel.aggregate(aggregatep)
    const convertObjectIdsToString = shopCount[0].shopIds.map((shopId) => shopId.toString());
    const cashierCountAggregate = [
      {
        $match: {
          parentId: { $in: convertObjectIdsToString },
        },
      },
      {
        $group: {
          _id: null,
          cashierCount: {
            $sum: {
              $cond: [{ $eq: ['$role', 'CASHIER'] }, 1, 0],
            },
          },
          kioskCount: {
            $sum: {
              $cond: [{ $eq: ['$role', 'KIOSK'] }, 1, 0],
            },
          },
        }
      },
      {
        $project: {
          _id: 0,
          cashierCount: 1,
          kioskCount: 1,
        }
      }
    ]
    const cashiersCount = await userModel.aggregate(cashierCountAggregate);
    const machinesCount = await machinesModel.find({ distributorId: new ObjectId(distributorId) }).lean();
console.log('cashiersCount--', cashiersCount)
    res.status(200).json({ counts: { ...cashiersCount[0], machinesCount: machinesCount.length, shopCount: shopCount[0].shopIds.length } || {cashierCount: 0, kioskCount: 0, machinesCount: 0 } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}




