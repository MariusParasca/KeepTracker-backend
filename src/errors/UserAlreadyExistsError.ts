import CustomError from './CustomError';

export default class UserAlreadyExistsError extends Error implements CustomError {
  statusCode: number;
  constructor(args: any) {
    super(args);
    this.statusCode = args.statusCode;
  }
}
