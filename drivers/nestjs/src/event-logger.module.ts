import { Client } from 'pg';

import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';

import {
  EventLoggerBaseModule,
  ForRootAsyncOptions,
  ForRootOptions,
} from './base';
import { createEventLogTable } from './data';

@Module({})
export class EventLoggerModule implements OnModuleInit {
  public constructor(@Inject('CONNECTION') private readonly client: Client) {}

  public onModuleInit() {
    createEventLogTable(this.client);
  }

  public static forRootAsync(options: ForRootAsyncOptions): DynamicModule {
    const baseModule = EventLoggerBaseModule.forRootAsync(options);

    return {
      ...baseModule,
      module: EventLoggerModule,
    };
  }

  public static forRoot(options: ForRootOptions): DynamicModule {
    const baseModule = EventLoggerBaseModule.forRoot(options);

    return {
      ...baseModule,
      module: EventLoggerModule,
    };
  }
}
