import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers(): string[] {
    return ['lalo', 'laura'];
  }
  getHello(): string {
    return 'Hello World!';
  }
}
