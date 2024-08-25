export abstract class Controller<T = undefined> {
  abstract execute(body: T): Promise<{ status: number; message: unknown }>;
}
