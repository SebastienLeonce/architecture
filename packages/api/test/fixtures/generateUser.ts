import { faker } from '@faker-js/faker'
import bcryptjs from 'bcryptjs';

export const generateUser = () => {
    const mail     = faker.internet.email();
    const username = faker.internet.userName();
    const password = faker.internet.password();

    const hashPassword = bcryptjs.hashSync(password)

    return {
        mail,
        username,
        password : hashPassword 
    }
}