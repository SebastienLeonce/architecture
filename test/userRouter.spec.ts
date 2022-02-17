import supertest from 'supertest'
import bcryptjs from 'bcryptjs';
import app from '../index'

import {UserModel, User } from '@models/User'
import { Types } from 'mongoose';
import { INVALID_PARAMETER_ID_FORMAT_ERROR } from '@shared/error/RequestError';

describe('userRouter', () => {
    const user = {
        username: 'test',
        password: bcryptjs.hashSync('test'),
        mail: 'test@test'
    }
    let _id : Types.ObjectId | String = '';

    const agent = supertest.agent(app)

    
    beforeEach(async () => {
        const doc = new UserModel<User>(user); 

        await doc.save();
        _id = doc._id;
        
        await agent.
            post('/api/auth/login',).
            send(user)
    })

    afterEach(async () => {
        await UserModel.deleteOne({ _id })
    })

    describe('GET /user', () => {
        it('Should Work', done => {
            agent.
                get('/api/user').
                expect(200).
                expect([{
                    _id: _id.toString(),
                    mail: user.mail,
                    username: user.username
                }], done)
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