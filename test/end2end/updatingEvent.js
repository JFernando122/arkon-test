const { describe, it } = require('mocha');
const { expect } = require('chai');

const app = require('../../index');

const request = require('supertest')(app);

const sendRequest = (eventId, payload) => {
  return request
    .put(`/api/v1/event/${eventId}`)
    .send(payload);
}


describe('Testing updating event endpont', () => {
  describe('Name change', () => {
    it('Should return 409 since the name its repeated', (done) => {
      const eventId = 10;
      const newName = "AVeryUniqueNameIndeed"

      sendRequest(eventId, { name: newName })
          .expect(409, done)
    });

    it('Should successfully change the name', (done) => {
      const eventId = 11;
      const newName = "Apollo 11";

      sendRequest(eventId, { name: newName })
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.property('name');
          expect(response.body.name).to.equal(newName);
          expect(response.body.id).to.equal(eventId);
          done();
        })
    })
  });

  describe('Quantity change', () => {
    it('Should return 400 since the new amount is lower than the current tickets sold (5)', (done) => {
      const eventId = 10;
      const newQuantity = 2;

      sendRequest(eventId, {quantity: newQuantity})
        .expect(400, done)
    });

    it('Should return 400 since its trying to change the quantity to a negative number', (done) => {
      const eventId = 10;
      const newQuantity = -20;

      sendRequest(eventId, {quantity: newQuantity})
        .expect(400, done)
    });

    it('Should return 400 since its trying to change the quantity to a number greater than 300', (done) => {
      const eventId = 10;
      const newQuantity = 500;

      sendRequest(eventId, {quantity: newQuantity})
        .expect(400, done)
    });

    it('Should update the amount of tickets since the number is still higher than the amount sold', (done) => {
      const eventId = 11;
      const newQuantity = 8;

      sendRequest(eventId, {quantity: newQuantity})
          .expect(200)
          .then((response) => {
            expect(response.body).to.have.property('quantity');
            expect(response.body.quantity).to.equal(newQuantity);
            expect(response.body.id).to.equal(eventId);
            done();
          })
    })
  });

  describe('Start_date change', () => {
    it('should return 400 since the date its not in the right format', (done) => {
      const eventId = 10;
      const newDate = '1998/03/18';

      sendRequest(eventId, { start_date: newDate })
        .expect(400, done);
    });

    it('Should return 400 since the new start_date is past the end_date', (done) => {
      const eventId = 10;
      const newDate = '14/12/2099';

      sendRequest(eventId, { start_date: newDate })
        .expect(400, done);
    });

    it('Should successfully update the start_date', (done) => {
      const eventId = 11;
      const newDate = '15/12/2020';

      sendRequest(eventId, { start_date: newDate })
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.property('start_date');
          expect(response.body.start_date).to.equal(newDate);
          expect(response.body.id).to.equal(eventId);
          done();
        });
    });
  });

  describe('Start_date change', () => {
    it('should return 400 since the date its not in the right format', (done) => {
      const eventId = 10;
      const newDate = '1998/03/18';

      sendRequest(eventId, { end_date: newDate })
        .expect(400, done);
    });

    it('Should return 400 since the new end_date is before the start_date', (done) => {
      const eventId = 10;
      const newDate = '10/12/2018';

      sendRequest(eventId, { end_date: newDate })
        .expect(400, done);
    });

    it('Should successfully update the end_date', (done) => {
      const eventId = 11;
      const newDate = '15/12/2020';

      sendRequest(eventId, { end_date: newDate })
        .expect(200)
        .then((response) => {
          expect(response.body).to.have.property('end_date');
          expect(response.body.end_date).to.equal(newDate);
          expect(response.body.id).to.equal(eventId);
          done();
        });
    });
  });
});