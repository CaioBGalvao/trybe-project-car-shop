import * as sinon from 'sinon';
import { expect } from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../err/catalog';
import CarModel from '../../../models/cars.model';
import CarService from '../../../services/cars.services';
import { carMock, carsMockWithId } from '../Modelmock/cars.model.mock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carsMockWithId);
    sinon.stub(carModel, 'read').resolves([carsMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carsMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carsMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  })

  describe('When creating a car', () => {
    it('Creates a new car succesfully', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carsMockWithId);
    });

    it('Fails when creating a new car', async () => {
      let error;

      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('When searching all cars', () => {
    it('Return all cars succesfully', async () => {
      const newCar = await carService.read();
      expect(newCar).to.be.deep.equal([carsMockWithId]);
    });
  });

  describe('When searching a car', () => {
    it('Return a car succesfully', async () => {
      const newCar = await carService.readOne('KozukiOden');
      expect(newCar).to.be.deep.equal(carsMockWithId);
    });

    it('Fails to return a car', async () => {
      let error;

      try {
        await carService.readOne(carsMockWithId._id);
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('When deleting a car', () => {
    it('Delete a car succesfully', async () => {
      const deletedCar = await carService.delete(carsMockWithId._id);
      expect(deletedCar).to.be.deep.equal(carsMockWithId);
    });

    it('Fails to return delete a car', async () => {
      let error;

      try {
        await carService.delete(carsMockWithId._id);
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('When updating a car', () => {
    it('Return an updated car succesfully', async () => {
      sinon.stub(carModel, 'update').resolves(carsMockWithId);

      const updatedCar = await carService.update('KozukiOden', carMock);
      expect(updatedCar).to.be.deep.equal(carsMockWithId);

      sinon.restore();
    });

    it('Fails to return an updated car - Zod Error', async () => {
      let error;

      try {
        await carService.update('KozukiOden', { INVALID: 'OBJECT' });
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('Fails to return an updated car - EntityNotFound', async () => {
      sinon.stub(carModel, 'update').resolves(null);

      let error;

      try {
        await carService.update('KozukiOden', carMock)
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);

      sinon.restore();
    });
  });
});