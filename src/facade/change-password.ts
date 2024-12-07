
import userModel from "../config/tableModels/user"
import dbo from '../dbo/base'
import { passwordSchema } from '../models/changePassword'
import * as Yup from 'yup'


const insert = async object => {

    try {
        await passwordSchema.validate(object, { abortEarly: false })
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            const errors = error.inner.reduce((acc, err) => {
                acc[err.path] = err.message
                return acc
            }, {})

            return { errors }
        }
    }

    const { _id } = object

    return await dbo.update(userModel, _id, object)
}



export { insert }
