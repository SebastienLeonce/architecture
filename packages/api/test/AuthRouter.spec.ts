import supertest from 'supertest'
import { generateUser } from './fixtures/generateUser';

import app from '../src/index'
import { UserModel } from '@models/User'

describe('AuthenticationRouter', () => {
    const user = generateUser();

    const success = {
        message: 'Success'
    }

    const agent = supertest(app)

    describe('POST /auth/login', () => {
        beforeEach(async () => {
            await agent.
                post("/api/auth/register").
                send(user).
                expect(success);
        })

        afterEach(async () => {
            await UserModel.deleteOne({ username: user.username });
        })

        it('Should put a JWT token on cookie and return success', done => {
            agent.
                post('/api/auth/login',).
                send(user).
                expect(201).
                expect(success).
                end((err, _res) => {
                    if (err) return done(err)
                    done()
                })
        })

        it('Shoud Destroy JWT', done => {
            agent.
                delete('/api/session').
                expect(200).
                end((_err, _res) => {
                    done()
                })
        })
    });
});