// import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';

let token;
let loginToken;
let bookId = `6215897105253301a4fda5d5`;


describe('User APIs Test', () => {
  beforeAll(async () => {
    const clearCollections = async () => {
      for (const collection in mongoose.connection.collections) {
        await mongoose.connection.collections[collection].deleteOne();
      }
    };
    
    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST, { useNewUrlParser: true});
      await clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      await mongooseConnect();
    } else {
      await clearCollections();
    } 
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
    // server.close();
  });


  describe(`Admin Creation`,()=>{

    it('Should return mail sent successfully', async () => {
      const res = await request(app)
        .post('/api/v1/users/admin')
        .send({
          "fullName": "adarsh",
          "email": "hrushikeshb2545b@gmail.com",
          "password" : "Adarsh@123",
          "phone" : "6302773050"
        });
        token = res.body.token
      expect(res.body.code).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it('Should return mail not sent', async () => {
      const res = await request(app)
        .post('/api/v1/users/admin')
        .send({
          "fullName": "adarsh",
          "email": "",
          "password" : "Adarsh@123",
          "phone" : "6302773050"
        });
      expect(res.body.code).toBe(400);
    });

    it('Should return password is required', async () => {
      const res = await request(app)
        .post('/api/v1/users/admin')
        .send({
          "fullName": "adarsh",
          "email": "hrushikeshb2545b@gmail.com",
          "password" : "",
          "phone" : "6302773050"
        });
      expect(res.body.code).toBe(400);
    });

    it('Should return invalid is phone number', async () => {
      const res = await request(app)
        .post('/api/v1/users/admin')
        .send({
          "fullName": "adarsh",
          "email": "hrushikeshb2545b@gmail.com",
          "password" : "Adarsh@123",
          "phone" : ""
        });
      expect(res.body.code).toBe(400);
    });

  });


  describe(`User Creation`,()=>{

    it('Should return mail sent successfully', async () => {
      const res = await request(app)
        .post('/api/v1/users/')
        .send({
          "fullName": "adarsh",
          "email": "hrushikeshb2545b@gmail.com",
          "password" : "Adarsh@123",
          "phone" : "6302773050"
        });
      expect(res.body.code).toBe(201);
    });

    it('Should return mail not sent', async () => {
      const res = await request(app)
        .post('/api/v1/users/')
        .send({
          "fullName": "adarsh",
          "email": "",
          "password" : "Adarsh@123",
          "phone" : "6302773050"
        });
      expect(res.body.code).toBe(400);
    });

    it('Should return password is required', async () => {
      const res = await request(app)
        .post('/api/v1/users/')
        .send({
          "fullName": "adarsh",
          "email": "hrushikeshb2545b@gmail.com",
          "password" : "",
          "phone" : "6302773050"
        });
      expect(res.body.code).toBe(400);
    });

    it('Should return invalid is phone number', async () => {
      const res = await request(app)
        .post('/api/v1/users/')
        .send({
          "fullName": "adarsh",
          "email": "hrushikeshb2545b@gmail.com",
          "password" : "Adarsh@123",
          "phone" : ""
        });
      expect(res.body.code).toBe(400);
    });

  });


  describe(`Token verification`,()=>{

    it('Should return token verified successfully', async () => {
      const res = await request(app)
        .post('/api/v1/users/verification')
        .set('Authorization', `Bearer ${token}`)
      expect(res.body.code).toBe(201);
    });

    it('Should return token not verified', async () => {
      const res = await request(app)
        .post('/api/v1/users/verification')
        .set('Authorization', `Bearer ${token[1]}`)
      expect(res.body.code).toBe(400);
    });

  });


  describe(`Login credentials`,()=>{

    it('Should return login successfully', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          "email": "hrushikeshb2545b@gmail.com",
          "password" : "Adarsh@123"
        })
        loginToken = res.body.data.loginToken;
      expect(res.body.code).toBe(200);
    });

    it('Should return invalid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          "email": "varshab@gmail.com",
          "password" : "Vishal@123"
        })
      expect(res.body.code).toBe(400);
    });

    it('Should return mail is required', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          "email": "",
          "password" : "Vishal@123"
        })
      expect(res.body.code).toBe(400);
    });

    it('Should return password is required', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          "email": "hrushikeshb2545b@gmail.com",
          "password" : ""
        })
      expect(res.body.code).toBe(400);
    });

  });

  describe(`Get All Books`,()=>{

    it('Should return All Books fetched successfully', async () => {
      const res = await request(app)
        .get('/api/v1/books')
        .set('Authorization', `Bearer ${loginToken}`)
      expect(res.body.code).toBe(200);
    });

    it('Should return jwt must be provided', async () => {
      const res = await request(app)
        .get('/api/v1/books')
        .set('Authorization', `Bearer `)
      expect(res.body.code).toBe(400);
    });
  });

  
  describe(`Get A Book`,()=>{

    it('Should return All Books fetched successfully', async () => {
      const res = await request(app)
        .get(`/api/v1/books/${bookId}`)
        .set('Authorization', `Bearer ${loginToken}`)
      expect(res.body.code).toBe(200);
    });

    it('Should return All Books fetched successfully', async () => {
      const res = await request(app)
        .get(`/api/v1/books/${bookId}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.body.code).toBe(400);
    });

  });

})
