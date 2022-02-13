import supertest from 'supertest'
import app from '../index'

describe('userRouter', () => {

    describe('GET /user', () => {
        it('Should Work', done => {
            supertest(app).
                get('/api/user').
                expect(200).
                expect([], done)
        })
    });

    describe('GET /user/:id', () => {
        it('Should Not Work', done => {
            supertest(app).
                get('/api/user/ezea').
                expect(400).
                expect('"Invalid Data"', done)
        })
    });
});