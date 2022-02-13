import getUsers   from './getUsers'
import postUser   from './postUser'
import getUser    from './getUser'
import putUser    from './putUser'
import deleteUser from './deleteUser'

export default {
    paths:{
        '/user':{
            ...getUsers,
            ...postUser
        },
        '/user/{id}':{
            ...getUser,
            ...putUser,
            ...deleteUser
        }
    }
}