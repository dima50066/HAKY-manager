import { ProductivityRecord } from "../db/models/productivity";
import { ObjectId } from "mongodb";
import { UsersCollection } from "../db/models/user";

export const getUserHistory = async (userId: string) => {
  const records = await ProductivityRecord.aggregate([
    {
      $match: { userId: new ObjectId(userId) },
    },
    {
      $group: {
        _id: {
          date: "$date",
          departmentId: "$departmentId",
          departmentName: "$departmentName",
        },
        totalUnits: { $sum: "$unitsCompleted" },
      },
    },
    { $sort: { "_id.date": -1, totalUnits: -1 } },
  ]);

  const uniqueDates = [
    ...new Set(records.map((r) => r._id.date.toISOString())),
  ];

  const dailyRankings = await ProductivityRecord.aggregate([
    {
      $match: { date: { $in: uniqueDates.map((date) => new Date(date)) } },
    },
    {
      $group: {
        _id: { date: "$date", userId: "$userId" },
        totalUnits: { $sum: "$unitsCompleted" },
      },
    },
    { $sort: { "_id.date": -1, totalUnits: -1 } },
  ]);

  const rankingMap: Record<string, { userId: string; totalUnits: number }[]> =
    {};
  dailyRankings.forEach((record) => {
    const dateKey = record._id.date.toISOString();
    if (!rankingMap[dateKey]) {
      rankingMap[dateKey] = [];
    }
    rankingMap[dateKey].push({
      userId: record._id.userId.toString(),
      totalUnits: record.totalUnits,
    });
  });

  const history = records.reduce<
    {
      date: Date;
      departments: {
        departmentId: string;
        departmentName: string;
        unitsCompleted: number;
        position: number;
      }[];
    }[]
  >((acc, record) => {
    const { date, departmentId, departmentName } = record._id;
    const formattedDate = date.toISOString();

    let day = acc.find((d) => d.date.toISOString() === formattedDate);
    if (!day) {
      day = { date, departments: [] };
      acc.push(day);
    }

    const dailyRanking = rankingMap[formattedDate] || [];
    const userIndex = dailyRanking.findIndex((r) => r.userId === userId);

    const userPosition = userIndex !== -1 ? userIndex + 1 : 0;

    day.departments.push({
      departmentId: departmentId.toString(),
      departmentName,
      unitsCompleted: record.totalUnits,
      position: userPosition,
    });

    return acc;
  }, []);

  return history;
};

export const getDepartmentRanking = async (
  departmentId: string,
  period: { date?: string; month?: string; allTime?: boolean }
) => {
  let matchQuery: any = {
    departmentId: new ObjectId(departmentId),
  };

  if (period.allTime) {
  } else if (period.month) {
    const startOfMonth = new Date(`${period.month}-01T00:00:00.000Z`);
    const endOfMonth = new Date(
      new Date(startOfMonth).setMonth(startOfMonth.getMonth() + 1)
    );
    matchQuery.date = { $gte: startOfMonth, $lt: endOfMonth };
  } else if (period.date) {
    matchQuery.date = new Date(period.date);
  }

  const records = await ProductivityRecord.aggregate([
    {
      $match: matchQuery,
    },
    {
      $group: {
        _id: "$userId",
        totalUnits: { $sum: "$unitsCompleted" },
      },
    },
    { $sort: { totalUnits: -1 } },
  ]);

  return records;
};

export const getDailyRanking = async (date: string) => {
  const records = await ProductivityRecord.aggregate([
    {
      $match: { date: new Date(date) },
    },
    {
      $group: {
        _id: "$userId",
        totalUnits: { $sum: "$unitsCompleted" },
      },
    },
    { $sort: { totalUnits: -1 } },
  ]);
  return records;
};

export const getAllUsers = async () => {
  return await UsersCollection.find({}, { _id: 1, name: 1 });
};
