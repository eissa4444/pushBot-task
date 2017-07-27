process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let models = require('../models/models');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);


describe('/POST device', () => {
    it('it should  POST a device ', (done) => {

        chai.request(server)
            .post('/register/122317498d17')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.json;                
                res.body.should.be.a('object');
                done();
            });
    });
});