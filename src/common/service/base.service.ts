import { Logger } from '@nestjs/common';

export abstract class BaseService {
  protected readonly logger = new Logger(BaseService.name);

  protected constructor() {
    this.logger.log('BaseService initialized');
  }
}
