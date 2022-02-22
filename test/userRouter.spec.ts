import supertest from 'supertest'
import bcryptjs from 'bcryptjs';
import app from '../src/index'

import mongoose from 'mongoose';
import { INVALID_PARAMETER_ID_FORMAT_ERROR } from '@shared/error/RequestError';
import { UserModel } from '@models/User';

describe('userRouter', () => {
    const user = {
        username: 'test',
        password: bcryptjs.hashSync('test'),
        mail: 'test@test'
    }

    const agent = supertest.agent(app)

    beforeEach(async () => {
        await UserModel.deleteMany({});
        await agent.
            post('/api/auth/register').
            send(user)
        
        await agent.
            post('/api/auth/login',).
            send(user)
    })

    describe('GET /user', () => {
        it('Should Work', done => {
            agent.
                get('/api/user').
                expect(200, done)/*.
                expect([{
                    _id: _id.toString(),
                    mail: user.mail,
                    username: user.username
                }], done)*/
        })
    });

    describe('GET /user/:id', () => {
        it('Should Not Work', done => {
            agent.
                get('/api/user/ezea').
                expect(400).
                expect(INVALID_PARAMETER_ID_FORMAT_ERROR, done)
        })
    });

    describe('GET /user/:id', () => {
        it('Should Not Work', done => {
            agent.
                delete('/api/session').
                end((err, _res) => {
                    if (err) return done(err)
                    agent.
                        get(`/api/user/ezea`).
                        expect(400, done)
                })
        })
    });
});