import { Client } from 'pg';

import { DynamicModule, Module, Provider } from '@nestjs/common';

import { createEventLogTable } from '../data';
import { EventLogger } from './event-logger';
import { ForRootAsyncOptions } from './for-root-async.options';
import { ForRootOptions } from './for-root.options';

@Module({})
export class EventLoggerBaseModule {
  private static createClient(options: ForRootOptions): Client {
    const client = new Client({
      host: options.connection.host,
      port: options.connection.port,
      user: options.connection.username,
      password: options.connection.password,
      database: options.connection.name,
      ...(options.connection.options ?? {}),
    });

    client.connect();

    return client;
  }

  public static forRoot(options: ForRootOptions): DynamicModule {
    const client = EventLoggerBaseModule.createClient(options);

    const eventLoggerProvider: Provider = {
      provide: options.loggerKey ?? EventLogger,
      useClass: EventLogger,
    };

    return {
      imports: [],
      providers: [
        { provide: 'CONNECTION', useValue: client },
        eventLoggerProvider,
      ],
      exports: [eventLoggerProvider],
      module: EventLoggerBaseModule,
    };
  }

  public static forRootAsync(options: ForRootAsyncOptions): DynamicModule {
    const clientProvider: Provider<Client> = {
      provide: 'CONNECTION',
      inject: options.inject,
      async useFactory(...args: any[]) {
        const forRootOptions = await options.useFactory(...args);
        const client = EventLoggerBaseModule.createClient(forRootOptions);

        return client;
      },
    };

    const eventLoggerProvider: Provider = {
      provide: options.loggerKey ?? EventLogger,
      useClass: EventLogger,
    };

    return {
      imports: options.imports,
      providers: [clientProvider, eventLoggerProvider],
      exports: [eventLoggerProvider],
      module: EventLoggerBaseModule,
    };
  }
}
