const { describe, it } = require('mocha');
const { expect } = require('chai');

const app = require('../../index');
const request = require('supertest')(app);

describe('Testing buying ticket endpoint', () => {
  it('should return 404 since the event doesnt exist', (done) => {
    const id = 12345;
    
    request
        .post(`/api/v1/ticket/event/${id}`)
        .expect(404)
        .end(done)
  });

  it('Should return 400 since the event is already past the end_date', (done) => {
    const id = 2;
    request
      .post(`/api/v1/ticket/event/${id}`)
      .expect(400, done);
  });

  it('Should return 400 since the event has sold out', (done) => {
    const id = 3;
    request
      .post(`/api/v1/ticket/event/${id}`)
      .expect(400, done);
  });

  it('should return the id of the ticket you just purchased', (done) => {
    const id = 1;
    request
      .post(`/api/v1/ticket/event/${id}`)
      .expect(201)
      .then((response) => {
        expect(response.body).to.have.property('id');
        done();
      });
  });
});