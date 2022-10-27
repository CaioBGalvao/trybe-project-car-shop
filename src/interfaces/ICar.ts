import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  }).positive({ message: 'doorsQty must be positive' })
    .int({ message: 'doorsQty must be integer' })
    .gte(2, { message: 'doorsQty must be greater than 2' }),
  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  }).positive({ message: 'doorsQty must be positive' })
    .int({ message: 'doorsQty must be integer' })
    .gte(2, { message: 'doorsQty must be greater than 2' })
    .lte(7, { message: 'doorsQty must be lesser than 7' }),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };