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

    describe('GET /post/:id', () => {
        // Test the get of one post
        it('Should return one post', done => {
            const post = {
                title: 'Test',
                content: 'Test',
                user: _id
            }

            agent.post('/api/post')
                    .send(post)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        agent.get(`/api/post/${res.body._id}`)
                             .expect(200, done)
                    })

                    
        });
    })

    describe('PUT /post/:id', () => {
        // Test the update of one post
        it('Should update one post', done => {
            const post = {
                title: 'Test',
                content: 'Test',
                user: _id
            }

            agent.post('/api/post')
                    .send(post)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        agent.put(`/api/post/${res.body._id}`)
                            .send({ title: 'Test2',
                            content: 'Test',
                            user: _id})
                            .expect(200, done)
                    })
        });
    })

    describe('DELETE /post/:id', () => {
        // Test the delete of one post
        it('Should delete one post', done => {
            const post = {
                title: 'Test',
                content: 'Test',
                user: _id
            }

            agent.post('/api/post')
                    .send(post)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        agent.delete(`/api/post/${res.body._id}`)
                            .expect(200, done)
                    })
        });
    })

    describe('GET /post/user/:id', () => {
        // Test the get of all the posts by user
        it('Should return all the posts by user', done => {
            const post = {
                title: 'Test',
                content: 'Test',
                user: _id
            }

            agent.post('/api/post')
                    .send(post)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        agent.get(`/api/post/user/${_id}`)
                            .expect(200, done)
                    })
        });
    }
    )

    describe('POST /post/:id/comment', () => {
        // Test the creation of a comment
        it('Should create a comment', done => {
            const post = {
                title: 'Test',
                content: 'Test',
                user: _id
            }

            agent.post('/api/post')
                    .send(post)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        const comment = {
                            content: 'Test',
                            user: _id,
                            post: res.body._id
                        }
                        agent.post(`/api/post/${res.body._id}/comment`)
                            .send(comment)
                            .expect(200, done)
                    })
        });
    })

    describe('GET /post/:id/comments', () => {
        // Test the get of one comment
        it('Should return a list of comments', done => {
            const post = {
                title: 'Test',
                content: 'Test',
                user: _id
            }
            agent.post('/api/post')
                    .send(post)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        agent.get(`/api/post/${res.body._id}/comments`)
                            .expect(200, done)
                    })

            
        });
    }
    )

});