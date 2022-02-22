import supertest from 'supertest'

import app from '../src/index'
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs';
import { UserModel } from '@models/User'

describe('AuthenticationRouter', () => {
    const user = {
        username: 'test',
        password: bcryptjs.hashSync('test'),
        mail: 'test@test'
    }
    const success = {
        message: 'Success'
    }

    const agent = supertest(app)

    describe('POST /auth/login', () => {
        beforeEach(async () => {
            await UserModel.deleteMany({});
            await agent.
                post("/api/auth/register").
                send(user);
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