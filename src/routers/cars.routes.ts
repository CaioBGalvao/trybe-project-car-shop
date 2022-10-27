import express from 'express';
import CarsController from '../controllers/cars.controllers';
import CarsService from '../services/cars.services';
import CarsModel from '../models/cars.model';

const carModel = new CarsModel();
const carsService = new CarsService(carModel);
const carsController = new CarsController(carsService);

const carsRoute = express.Router();

carsRoute
  .post('/', (req, res) => carsController.create(req, res))
  .get('/', (req, res) => carsController.read(req, res))
  .get('/:id', (req, res) => carsController.readOne(req, res))
  .put('/:id', (req, res) => carsController.update(req, res))
  .delete('/:id', (req, res) => carsController.delete(req, res));

export default carsRoute;