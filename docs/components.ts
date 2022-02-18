import m2s            from 'mongoose-to-swagger';

import { UserModel } from "@models/User";

const newUser = m2s(UserModel);
delete newUser.properties._id
delete newUser.properties.admin
newUser.title = "newUser"

const getUser = m2s(UserModel);
delete getUser.properties.password
getUser.title = "getUser"

const login = m2s(UserModel);
delete login.properties._id
delete login.properties.admin
delete login.properties.mail
login.title = "login"

export default {
    components: {
        schemas: {
            User: m2s(UserModel),
            newUser,
            getUser,
            login
        }
    }
};