const { describe, it } = require('mocha')
const { expect } = require('chai');

const app = require('../../index');

const request = require('supertest')(app);


describe('Checking event details', () => {
  it('Should return not found since the id is not in the database', (done) => {
    const id = 5896;
    request
      .get(`/api/v1/event/${id}`)
      .expect(404, done);
  });

  it("should return the info of the event", (done) => {
    const id = 1;
    request
      .get(`/api/v1/event/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).to.have.property('quantity');
        expect(response.body).to.have.property('sold');
        expect(response.body).to.have.property('redeemed');

        done();
      });
  });
})
