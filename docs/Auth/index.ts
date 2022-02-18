import login    from './login'
import register from './register'

export default {
    '/auth/login' : {
            ...login
    },
    '/auth/register' : {
        ...register
    }
}