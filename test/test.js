const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../bin/www');

const should = chai.should();

chai.use(chaiHttp);

describe('Routes', () => {
  it('should return status code 200 on / GET', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
