import m2s            from 'mongoose-to-swagger';

import { UserModel } from "@models/User";

const options = {
    props: ['example'],
}

const newUser = m2s(UserModel, options);
delete newUser.properties._id
delete newUser.properties.admin
newUser.title = "newUser"

const getUser = m2s(UserModel, options);
delete getUser.properties.password
delete getUser.properties.admin
getUser.title = "getUser"

const login = m2s(UserModel, options);
delete login.properties._id
delete login.properties.admin
delete login.properties.mail
login.title = "login"

export default {
    components: {
        schemas: {
            User: m2s(UserModel, options),
            newUser,
            getUser,
            login
        }
    }
};