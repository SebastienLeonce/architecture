import User from 'docs/User'
import Auth from 'docs/Auth'

export default {
    paths: {
        ...Auth,
        ...User     
    }
}