export class InvalidParamError extends Error {
  status: number;
  constructor(paramError: string, status: number) {
    super(`Invalid param ${paramError}`);
    this.name = 'Invalid';
    this.status = status || 400;
  }
}
