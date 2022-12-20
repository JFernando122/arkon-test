const { it, describe } = require('mocha');
const { expect } = require('chai');

const ValidationError = require('../../errors/ValidationError');

const { validateQuantity, validateDates, validateDateFormat } = require('../../validation/EventValidation');


describe('testing validation on creation of event', () => {
  describe('testing quantity validation', () => {

    it('should throw error saying quantity must be a number', () => {
      const quantity = "Not a number";

      expect(() => validateQuantity(quantity)).to.throw(ValidationError, /must be a number/);
    });

    it('(passing negative number) should throw error saying quantity must be between 1 and 300', () => {
      const quantity = -250;

      expect(() => validateQuantity(quantity)).to.throw(ValidationError, /between 1 and 300/);
    });

    it('(passing number greater than 300) should throw error saying quantity must be between 1 and 300', () => {
      const quantity = 500;

      expect(() => validateQuantity(quantity)).to.throw(ValidationError, /between 1 and 300/);
    });
    it('Should return true since the quantity is a number between 1 and 300' , () => {
      const quantity = 250;
      expect(validateQuantity(quantity)).to.be.true;
    });
  });

  describe('testing date validation', () => {
    it('Should throw error since the date is NOT in the correct format', () => {
      const date = '2012/25/10';
      expect(() => validateDateFormat(date)).to.throw(ValidationError, /DD\/MM\/YYYY/);
    });

    it('Should return true since the date is in the correct format', () => {
      const date = '13/12/2022';

      expect(validateDateFormat(date)).to.equal(true);
    });

    it('Should throw error since start_date is AFTER end_date', () => {
      const start_date = "18/03/2023";
      const end_date = "25/01/2021";

      expect(() => validateDates(start_date, end_date)).to.throw(ValidationError, /start_date must be before end_date/);
    });

    it('Should return true since the dates are in order', () => {
      const start_date = "13/12/2022";
      const end_date = "25/01/2023";

      expect(validateDates(start_date, end_date)).to.equal(true);
    });
  });
});