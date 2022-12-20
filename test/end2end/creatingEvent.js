const app = require('../../index');

const { describe, it } = require('mocha');
const { expect } = require('chai');
const request = require('supertest')(app);


describe('Creating event', () => {
  it('Should return error 409 since the event name is NOT unique', (done) => {
    const repeatedName = 'Regular show';
    const newEvent = {
      name: repeatedName,
      start_date: '13/12/2022',
      end_date: '01/01/2023',
      quantity: 250,
    }
    request
      .post('/api/v1/event')
      .send(newEvent)
      .expect(409, done)
  });

  it('should create the event and return the details of the event', (done) => {
    const newEvent = {
      name: 'UniqueName',
      start_date: '13/12/2022',
      end_date: '01/01/2023',
      quantity: 250,
    }
    request
      .post('/api/v1/event')
      .send(newEvent)
      .expect(201)
      .then(response => {
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.equal(newEvent.name);
        expect(response.body).to.have.property('sold');
        expect(response.body.sold).to.equal(0);
        expect(response.body).to.have.property('redeemed');
        expect(response.body.redeemed).to.equal(0);
        expect(response.body).to.have.property('id');
        done();
      });
  });
});