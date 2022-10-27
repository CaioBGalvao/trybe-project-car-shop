import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import CarsController from '../../../controllers/cars.controllers';
import CarsService from '../../../services/cars.services';
import CarsModel from '../../../models/cars.model';
import { carMock, carsMockWithId } from '../Modelmock/cars.model.mock';

describe('Car Controller', () => {
	const carModel = new CarsModel();
	const carsService = new CarsService(carModel);
	const carsController = new CarsController(carsService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  })

  describe('When creating a car', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'create').resolves(carMock);
    });

    it('Creates a new car succesfully', async () => {
      req.body = carMock;
      await carsController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });

  describe('When searching all car', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'read').resolves([carsMockWithId]);
    });

    it('Return all cars succesfully', async () => {
      await carsController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith([carsMockWithId])).to.be.true;
    });
  });

  describe('When searching a car', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'readOne').resolves(carsMockWithId);
    });

    it('Return a car succesfully', async () => {
      req.params = { id: carsMockWithId._id };
      await carsController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carsMockWithId)).to.be.true;
    });
  });

  describe('When updating a car', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'update').resolves(carsMockWithId);
    });

    it('Return a car succesfully', async () => {
      req.body = carMock;
      req.params = { id: carsMockWithId._id };
      await carsController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carsMockWithId)).to.be.true;
    });
  });

  describe('When deleting a car', () => {
    beforeEach(() => {
      sinon.stub(carsService, 'delete').resolves(carsMockWithId);
    });

    it('Delete a car succesfully', async () => {
      req.params = { id: carsMockWithId._id };
      await carsController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(204)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith()).to.be.true;
    });
  });
});