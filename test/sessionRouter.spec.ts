import supertest from 'supertest'

import app from '../index'
import { UserModel, User } from '@models/User';
import { Types } from 'mongoose';

describe('sessionRouter', () => {
    const user = {
        username: 'test',
        password: 'test' 
    }
    let _id : Types.ObjectId | String = '';
    let jwt = '';

    describe('POST /session', () => {
        beforeEach(async () => {
            const doc = new UserModel<User>(user); 

            await doc.save();
            _id = doc._id;
        })

        afterEach(async () => {
            await UserModel.deleteOne({ _id })
        })

        it('Should Return a JWT', done => {
            supertest(app).
                post('/api/session').
                send(user).
                expect(200).
                expect(user).
                end((err, res) => {
                    if (err) done(err)
                    const cookies = res.headers['set-cookie'][0].split(',').map((item: string) => item.split(';')[0])
                    jwt = (cookies[0] as String).split('=')[1]
                    done()
                })
        })

        it('Shoud Destroy JWT', done => {
            supertest(app).
            delete('/api/session').
            set('Cookie', [`jwt=${jwt}`]).
            expect(200, done)
        })
    });
});