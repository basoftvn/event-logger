import { DynamicModule, Module } from '@nestjs/common';

import {
  EventLoggerBaseModule,
  ForRootAsyncOptions,
  ForRootOptions,
} from './base';

@Module({})
export class EventLoggerModule {
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
