import { Controller, Get } from '@nestjs/common';
import { Public } from './shared/middleware/public';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
