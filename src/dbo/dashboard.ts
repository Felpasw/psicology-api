import schedule from '../config/tableModels/schedule'

async function getMonthlyRevenue() {
  try {
    const result = await schedule.aggregate([
      {
        $match: {
          status: 'completed',
          date: {
            $gte: new Date('2024-01-01T00:00:00Z'),
            $lt: new Date('2025-01-01T00:00:00Z'),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
          },
          totalConsultas: { $sum: 1 },
        },
      },
      {
        $project: {
          year: '$_id.year',
          month: '$_id.month',
          faturamento: { $multiply: ['$totalConsultas', 62.5] },
        },
      },
      {
        $sort: { month: 1 },
      },
      {
        $group: {
          _id: null,
          faturamentoPorMes: { $push: { month: '$month', faturamento: '$faturamento' } },
        },
      },
      {
        $project: {
          faturamentoPorMes: {
            $concatArrays: [
              [
                { month: 1, faturamento: 0 },
                { month: 2, faturamento: 0 },
                { month: 3, faturamento: 0 },
                { month: 4, faturamento: 0 },
                { month: 5, faturamento: 0 },
                { month: 6, faturamento: 0 },
                { month: 7, faturamento: 0 },
                { month: 8, faturamento: 0 },
                { month: 9, faturamento: 0 },
                { month: 10, faturamento: 0 },
                { month: 11, faturamento: 0 },
                { month: 12, faturamento: 0 },
              ],
              '$faturamentoPorMes',
            ],
          },
        },
      },
      {
        $project: {
          faturamentoPorMes: {
            $map: {
              input: '$faturamentoPorMes',
              as: 'mes',
              in: {
                month: '$$mes.month',
                faturamento: {
                  $ifNull: [
                    {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: '$faturamentoPorMes',
                            as: 'item',
                            cond: { $eq: ['$$item.month', '$$mes.month'] },
                          },
                        },
                        0,
                      ],
                    },
                    { faturamento: 0 },
                  ],
                },
              },
            },
          },
        },
      },
    ])
    return result
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default { getMonthlyRevenue }
