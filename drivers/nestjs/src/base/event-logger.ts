import { Inject, Injectable } from '@nestjs/common';

import { LogLevels } from '../data';
import { EventLogBuilder } from './event-log-builder';
import { Client } from 'pg';

@Injectable()
export class EventLogger {
  public constructor(@Inject('CONNECTION') private readonly client: Client) {}

  public create(type: LogLevels): EventLogBuilder {
    return new EventLogBuilder(this.client, type);
  }
}
