import m2s            from 'mongoose-to-swagger';

import { UserModel } from "@models/User";

const newUser = m2s(UserModel);
delete newUser.properties._id
newUser.title = "newUser"

const getUser = m2s(UserModel);
delete getUser.properties.password
getUser.title = "getUser"

export default {
    components: {
        schemas: {
            User: m2s(UserModel),
            newUser,
            getUser
        }
    }
};