import { HttpStatus } from '@nestjs/common';

export class HttpResponse {
  success: boolean;
  message: string;
  data: any;
  status: number;

  constructor(
    success: boolean,
    message: string,
    data: any,
    status: number = HttpStatus.OK,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.status = status;
  }
}
