import { Receipt } from '../models/receipts.model';
import mongoose from 'mongoose';

const getTotalReceipts = async (userId: string) => {
  const result = await Receipt.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $count: 'totalReceipts',
    },
  ]);
  return result[0]?.totalReceipts || 0;
};

const getTotalSpent = async (userId: string) => {
  const result = await Receipt.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
        transactionType: 'expense',
      },
    },
    {
      $group: {
        _id: null,
        totalSpent: {
          $sum: { $toDouble: { $ifNull: ['$extractedData.total', 0] } },
        },
      },
    },
  ]);
  return result[0]?.totalSpent || 0;
};

const getTotalEarned = async (userId: string) => {
  const result = await Receipt.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
        transactionType: 'income',
      },
    },
    {
      $group: {
        _id: null,
        totalEarned: {
          $sum: { $toDouble: { $ifNull: ['$extractedData.total', 0] } },
        },
      },
    },
  ]);
  return result[0]?.totalEarned || 0;
};

const getMonthlyEarnedTrend = async (userId: string) => {
  return await Receipt.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
        transactionType: 'income',
      },
    },
    {
      $addFields: {
        parsedDate: {
          $ifNull: [
            {
              $dateFromString: {
                dateString: '$extractedData.date',
                format: '%d-%m-%Y',
              },
            },
            '$createdAt',
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: '$parsedDate',
          },
          month: {
            $month: '$parsedDate',
          },
        },
        totalEarned: {
          $sum: { $toDouble: { $ifNull: ['$extractedData.total', 0] } },
        },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        totalEarned: 1,
      },
    },
  ]);
};

const getMonthlySpentTrend = async (userId: string) => {
  return await Receipt.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
        transactionType: 'expense',
      },
    },
    {
      $addFields: {
        parsedDate: {
          $ifNull: [
            {
              $dateFromString: {
                dateString: '$extractedData.date',
                format: '%d-%m-%Y',
              },
            },
            '$createdAt',
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: '$parsedDate',
          },
          month: {
            $month: '$parsedDate',
          },
        },
        totalSpent: {
          $sum: { $toDouble: { $ifNull: ['$extractedData.total', 0] } },
        },
      },
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
      },
    },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        totalEarned: 1,
      },
    },
  ]);
};

export {
  getTotalReceipts,
  getTotalSpent,
  getTotalEarned,
  getMonthlySpentTrend,
  getMonthlyEarnedTrend,
};
