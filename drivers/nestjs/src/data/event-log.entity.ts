import { v4 } from 'uuid';

import { LogLevels } from './log-levels';

export class EventLogEntity {
  id = v4();

  type!: LogLevels;

  scope!: string;

  message!: string;

  stack!: string;

  detail!: string;

  attachment!: any;

  createdAt!: Date;

  source!: string;
}
