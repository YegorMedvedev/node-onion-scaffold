export class CommonError extends Error {
  public readonly code!: string;
  public readonly status!: number;
  public readonly details!: any;

  protected readonly params: Record<string, any>;

  constructor(code: string, status: number, details?: any) {
    super();
    this.params = {};

    Object.defineProperties(this, {
      name: {get: () => this.constructor.name},
      code: {get: () => code},
      status: {get: () => status},
      details: {get: () => details},
    });

    Error.captureStackTrace(this, this.constructor);
  }
}
