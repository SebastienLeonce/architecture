import supertest from 'supertest'
import { generateUser } from './fixtures/generateUser';

import app from '../src/index'
import { PostModel } from '@models/PostModel'
import { UserModel } from '@models/User';
import * as AuthError from "@shared/error/AuthError";
import * as RequestError from "@shared/error/RequestError";

// Test the creation post
describe('PostRouter', () => {
    const user = generateUser();
    let _id = "";

    const agent = supertest.agent(app)

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

    describe('GET /post', () => {
        // Test the get of all the posts
        it('Should return all the posts',  done => {
            agent.get('/api/post')
                 .expect(200, done)
            
        });
    })

    describe('POST /post', () => { 
        // Test the creation of a post
        it('Should create a post', done => {
            const post = {
                title: 'Test',
                content: 'Test',
                user: _id
            }

            agent.post('/api/post')
                    .send(post)
                    .expect(200, done);
        });
    })
});