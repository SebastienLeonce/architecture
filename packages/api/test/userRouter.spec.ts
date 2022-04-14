import supertest from 'supertest'
import sinon from 'sinon'
import { generateUser } from './fixtures/generateUser';

import app from '../src/index'

import { INVALID_PARAMETER_ID_FORMAT_ERROR } from '@shared/error/RequestError';
import * as DatabaseError from "@shared/error/DatabaseError";
import * as UserError from "@shared/error/UserError";
import { UserModel } from '@models/User';

describe('userRouter', () => {
    const user = generateUser();
    let _id = ""

    const agent = supertest.agent(app)

    beforeEach((done) => {
        agent.
            post('/api/auth/register').
            send(user).
            end((err, res) => {
                if (err) return done(err)
                _id = res.body._id;
                done()
            })
    })

    afterEach(async () => {
        await UserModel.deleteOne({ username: user.username });
    })

    describe('GET /user', () => {
        it('Should Work', done => {
           agent.
                get('/api/user').
                expect(200, done)/*.
                expect([{
                    _id,
                    mail: user.mail,
                    username: user.username
                }], done)*/
        })

        it('Should Not Work', async () => {
            const stub = sinon.stub(UserModel, 'find').rejects('fds');
            await agent.
                get('/api/user').
                expect(500).
                expect(DatabaseError.DB_UNAVAILABLE_ERROR)
            stub.restore();
        })
    });

    describe('PUT /user/:id', () => {
        it('Should Work', done => {
            const newPassword = "newPassword"
            agent.
                put(`/api/user/${_id}`).
                send({ password: newPassword }).
                expect(200).
                expect({
                    _id,
                    mail: user.mail,
                    username: user.username,
                    following: [],
                    followers: []
                }, done)
        })

        it("Should Not Work", async () => {
          const stub = sinon.stub(UserModel, "findByIdAndUpdate").rejects("fds");
          const newPassword = "newPassword";
          await agent
            .put(`/api/user/${_id}`)
            .send({ password: newPassword })
            .expect(500)
            .expect(DatabaseError.DB_UNAVAILABLE_ERROR);
          stub.restore();
        });        
    });

    describe('DELETE /user/:id', () => {
        it('Should Work', done => {
            agent.
                delete(`/api/user/${_id}`).
                expect(200).
                expect({
                    message: 'User deleted successfully'
                }, done)
        })

        it("Should Not Work", async () => {
          const stub = sinon.stub(UserModel, "deleteOne").rejects("fds");
          await agent
            .delete(`/api/user/${_id}`)
            .expect(500)
            .expect(DatabaseError.DB_UNAVAILABLE_ERROR);
          stub.restore();
        });  
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

        it('Should Not Work', done => {
            agent.
                get('/api/user/ezea').
                expect(400).
                expect(INVALID_PARAMETER_ID_FORMAT_ERROR, done)
        })

        it('Should Not Work', async () => {
            const stub = sinon.stub(UserModel, 'findOne').rejects('fds');
            await agent.
                get(`/api/user/${_id}`).
                expect(500).
                expect(DatabaseError.DB_UNAVAILABLE_ERROR)
            stub.restore();
        })
    });

    // Test the follow 
    describe('POST /user/:id/follow', () => {
        // it('Should Work', done => {
        //     agent.
        //         post(`/api/user/${_id}/follow`).
        //         send({ following: user.username }).
        //         expect(200).
        //         expect({
        //             message: 'User followed successfully'
        //         }, done)
        // })

        // it('Should Not Work', async () => {
        //     const stub = sinon.stub(UserModel, 'findOne').rejects('fds');
        //     await agent.
        //         post(`/api/user/${_id}/follow`).
        //         send({ following: _id }).
        //         expect(404).
        //         expect(UserError.USER_NOT_FOLLOWING_ERROR)
        //     stub.restore();
        // })
    }
    );

    // Test the unfollow
    describe('POST /user/:id/follow', () => {
        // it('Should Work', done => {
        //     agent.
        //         post(`/api/user/${_id}/unfollow`).
        //         send({ following: user.username }).
        //         expect(200).
        //         expect({
        //             message: 'User unfollowed successfully'
        //         }, done)
        // })

        // it('Should Not Work', async () => {
        //     const stub = sinon.stub(UserModel, 'findOne').rejects('fds');
        //     await agent.
        //         post(`/api/user/${_id}/unfollow`).
        //         send({ following: _id }).
        //         expect(500).
        //         expect(DatabaseError.DB_UNAVAILABLE_ERROR)
        //     stub.restore();
        // })
    }
    );
});