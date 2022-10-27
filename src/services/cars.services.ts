import IService from '../interfaces/IService';
import ICars, { CarZodSchema } from '../interfaces/ICar';
import IModel from '../interfaces/IModel';
import { ErrorTypes } from '../err/catalog';

class CarService implements IService<ICars> {
  private _car: IModel<ICars>;

  constructor(model: IModel<ICars>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICars> {
    const parsedObj = CarZodSchema.safeParse(obj);

    if (!parsedObj.success) {
      throw parsedObj.error;
    }

    return this._car.create(parsedObj.data);
  }

  public async read(): Promise<ICars[]> {
    return this._car.read();
  }

  public async readOne(id: string): Promise<ICars> {
    const car = await this._car.readOne(id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(id: string, obj: unknown): Promise<ICars> {
    const parsedObj = CarZodSchema.safeParse(obj);

    if (!parsedObj.success) {
      throw parsedObj.error;
    }

    const updatedCar = await this._car.update(id, parsedObj.data);

    if (!updatedCar) throw new Error(ErrorTypes.EntityNotFound);

    return updatedCar;
  }

  public async delete(id: string): Promise<ICars> {
    const deletedCar = await this._car.delete(id);

    if (!deletedCar) throw new Error(ErrorTypes.EntityNotFound);

    return deletedCar;
  }
}

export default CarService;