import supertest from 'supertest'
import { generateUser } from './fixtures/generateUser';

import app from '../src/index'
import { UserModel } from '@models/User'
import * as AuthError from "@shared/error/AuthError";
import * as RequestError from "@shared/error/RequestError";

describe('AuthenticationRouter', () => {
    const user = generateUser();

    const success = {
        message: 'Success'
    }

    const agent = supertest(app)

    describe('POST /auth/login', () => {
        let _id = '';

        beforeEach((done) => {
            agent.
                post("/api/auth/register").
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

        it('Should put a JWT token on cookie and return success', done => {
            agent.
                post('/api/auth/login',).
                send(user).
                expect(201).
                expect({
                    message: 'Success',
                    _id
                }).
                end((err, _res) => {
                    if (err) return done(err)
                    done()
                })
        })

        it("Login with wrong password", (done) => {
            const user2 = user;
            user2.password = "WrongPassword"

            agent
                .post("/api/auth/login")
                .send(user2)
                .expect(401)
                .expect(AuthError.USER_PASSWORD_ERROR)
                .end((err, _res) => {
                    if (err) return done(err);
                    done();
                });
        });

        it("Login with empty body", (done) => {
          agent
            .post("/api/auth/login")
            .send({})
            .expect(400)
            .expect(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR)
            .end((err, _res) => {
                if (err) return done(err);
                done();
            });
        });

        it("Register with empty body", (done) => {
          agent
            .post("/api/auth/register")
            .send({})
            .expect(400)
            .expect(RequestError.BODY_PARAMETERS_UNDEFINED_ERROR)
            .end((err, _res) => {
                if (err) return done(err);
                done();
            });
        });

        it('Shoud Destroy JWT', done => {
            agent
              .delete("/api/auth/logout")
              .expect(200)
              .end((_err, _res) => {
                done();
              });
        })
    });
});