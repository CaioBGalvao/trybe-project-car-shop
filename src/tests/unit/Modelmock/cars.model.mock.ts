import ICar from '../../../interfaces/ICar';

const carMock:ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carsMockWithId:ICar & { _id:string } = {
  "_id": "6359c56618d0a6f50a669fc9",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

export { carMock, carsMockWithId };