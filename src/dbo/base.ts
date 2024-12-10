import { Document, model, Model } from 'mongoose'

interface expectParamsDate {
  day?: string
  month?: string
}

async function insert(Model, data) {
  try {
    const newDocument = new Model(data)
    return await newDocument.save()
  } catch (error) {
    return new Error(`ERROR! ${error}`)
  }
}

async function get<T extends Document>(Model: Model<T>, object: any): Promise<T[]> {
  try {
    return await Model.find({ ...object, deletedAt: null })
  } catch (error) {
    throw new Error(`Erro ao encontrar documentos: ${error}`)
  }
}

async function update<T extends ModelDocument>(Model: Model<T>, id: string, data: Partial<T>): Promise<T | null> {
  try {
    return await Model.findByIdAndUpdate(id, data)
  } catch (error) {
    throw new Error(`Erro ao atualizar documento: ${error}`)
  }
}

async function remove<T extends ModelDocument>(Model: Model<T>, id: string): Promise<T> {
  try {
    return await Model.findByIdAndUpdate(id, { deletedAt: new Date() })
  } catch (error) {
    throw new Error(`Erro ao excluir documento: ${error}`)
  }
}

async function filterByMonthOrDay<T extends Document>(
  Model: Model<T>,
  field: keyof T,
  params: expectParamsDate
): Promise<T[]> {
  const query: any = {}

  if (params.month || params.day) {
    query.$expr = { $and: [] }

    if (params.month) {
      query.$expr.$and.push({
        $eq: [{ $month: `$${field}` }, params.month],
      })
    }
    if (params.day) {
      query.$expr.$and.push({
        $eq: [{ $dayOfMonth: `$${field}` }, params.day],
      })
    }
  } else {
    throw new Error('É necessário fornecer ao menos um parâmetro: year, month ou day.')
  }
  try {
    return await Model.find(query)
  } catch (error) {
    throw new Error(`Erro ao filtrar documentos: ${error}`)
  }
}

export default {
  get,
  insert,
  update,
  remove,
  filterByMonthOrDay,
}
