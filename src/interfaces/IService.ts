interface IService<T> {
  create(object: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(_id: string): Promise<T | null >,
  update(_id: string, obj: unknown):Promise<T>
  delete (_id: string): Promise < T | null >,
}

export default IService;