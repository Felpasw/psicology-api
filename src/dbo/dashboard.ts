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
          faturamento: { $multiply: ['$totalConsultas', 62.5] },
        },
      },
      {
        $sort: { month: 1 },
      },
    ])
    return result
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default { getMonthlyRevenue }
