import dboDashboard from '../dbo/dashboard'

const getMonthlyRevenue = async (param) => {
  return await dboDashboard.getMonthlyRevenue()
}

export default {
  getMonthlyRevenue,
}
