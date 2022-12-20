const { describe, it } = require('mocha');
const { expect } = require('chai');

const app = require('../../index');

const request = require('supertest')(app);

describe('Testing redeeming ticket endPoint', () => {
  it('should return 404 since the ticket id is invalid', (done) => {
    const ticketId = 12345;

    request
      .put(`/api/v1/ticket/${ticketId}`)
      .expect(404, done);
  });

  it('Should return 400 since the event is already past the end_date', (done) => {
    const ticketId = 6;
    request
      .put(`/api/v1/ticket/${ticketId}`)
      .expect(400, done);
  });

  it('Should return 409 since the ticket is already redeemed', (done) => {
    const ticketId = 2;

    request
      .put(`/api/v1/ticket/${ticketId}`)
      .expect(409, done)
  });

  it('Sould return 400 since the event the start_date is not past', (done) => {
    const ticketId = 13;

    request
        .put(`/api/v1/ticket/${ticketId}`)
        .expect(400, done);
  });

  it('should be successful since the event is between startand end dates and ticket isnt already redeemed', (done) => {
    const ticketId = 1;

    request
      .put(`/api/v1/ticket/${ticketId}`)
      .expect(200, done);
  });
});