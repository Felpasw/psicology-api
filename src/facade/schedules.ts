import dbo from '../dbo/base'
import schedule from '../config/tableModels/schedule'


const get = async object => {
    return await  dbo.get(schedule, object)
}

const insert = async object => {
    
    return await  dbo.insert(schedule, object) 
}
const update = async (object, id) => {
    return await  dbo.update(schedule,  id, object)
}

const remove = async (id) => {
    return await dbo.remove(schedule, id)
}
  
export  { get, insert, update, remove }
