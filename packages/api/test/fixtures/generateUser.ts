import { faker } from '@faker-js/faker'

export const generateUser = () => {
    const mail     = faker.internet.email();
    const username = faker.internet.userName();
    const password = faker.internet.password();

    return {
        mail,
        username,
        password
    }
}