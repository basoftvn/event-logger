import { LogLevels } from '../data';

import { Injectable } from '@nestjs/common';

import { EventLogBuilder } from './event-log-builder';

@Injectable()
export class EventLogger {
  public create(type: LogLevels): EventLogBuilder {
    return new EventLogBuilder(null, type);
  }
}
