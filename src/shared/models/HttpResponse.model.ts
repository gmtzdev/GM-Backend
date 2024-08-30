import { HttpStatus } from '@nestjs/common';

export class HttpResponse {
  success: boolean;
  message: string;
  object: any;
  status: number;

  constructor(
    success: boolean,
    message: string,
    object: any,
    status: number = HttpStatus.OK,
  ) {
    this.success = success;
    this.message = message;
    this.object = object;
    this.status = status;
  }
}
