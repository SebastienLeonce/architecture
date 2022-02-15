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
    const agent = supertest(app)

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
            agent.
                post('/api/session').
                send(user).
                expect(200).
                expect(user).
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