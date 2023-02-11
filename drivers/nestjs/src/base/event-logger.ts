import { Injectable } from '@nestjs/common';

import { LogLevels } from '../data';
import { EventLogBuilder } from './event-log-builder';

@Injectable()
export class EventLogger {
  public create(type: LogLevels): EventLogBuilder {
    return new EventLogBuilder(null, type);
  }
}
