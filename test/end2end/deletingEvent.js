const { describe, it } = require('mocha');
const { expect } = require('chai');

const app = require('../../index');

const request = require('supertest')(app);

describe('Testing deleting event endpoint', () => {
  it('should return 400 since the event have atleast one sold ticket', (done) => {
    const id = 4;

    request
        .delete(`/api/v1/event/${id}`)
        .expect(400, done);
  });

  it('should delete the event since it has 0 sold tickets', (done) => {
    const id = 5;

    request
      .delete(`/api/v1/event/${id}`)
      .expect(200, done);
  });

  it('should delete the event since its past the end_date event with sold tickets', (done) => {
    const id = 6;

    request
      .delete(`/api/v1/event/${id}`)
      .expect(200, done)
  });

  it('Should delete the event since its past the end_date with no tickets sold', (done) => {
    const id = 7;

    request
      .delete(`/api/v1/event/${id}`)
        .expect(200, done);
  });
});