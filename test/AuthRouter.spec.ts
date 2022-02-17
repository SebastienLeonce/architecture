import supertest from 'supertest'

import app from '../index'
import { UserModel, User } from '@models/User';
import { Types } from 'mongoose';

describe('AuthenticationRouter', () => {
    const user = {
        username: 'test',
        password: 'test' 
    }
    const success = {
        message: 'Success'
    }
    let _id : Types.ObjectId | String = '';
    const agent = supertest(app)

    describe('POST /auth/login', () => {
        beforeEach(async () => {
            const doc = new UserModel<User>(user); 

            await doc.save();
            _id = doc._id;
        })

        afterEach(async () => {
            await UserModel.deleteOne({ _id })
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