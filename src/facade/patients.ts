
import PatientModel from "../config/tableModels/patients"
import dbo from '../dbo/base'


const get = async object => {
    return await  dbo.get(PatientModel, object)
}

const insert = async object => {
    return await  dbo.insert(PatientModel, object)
  
}

const update = async (object, id) => {
    return await  dbo.update(PatientModel,  id, object)
}

const remove = async id => {
    return await  dbo.remove(PatientModel, id)
 
}

export  { get, insert, update, remove }
