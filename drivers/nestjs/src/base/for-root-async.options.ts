import { ModuleMetadata } from '@nestjs/common';
import { ForRootOptions } from './for-root.options';

export interface ForRootAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject: any[];
  useFactory: (
    ...args: any[]
  ) =>
    | Promise<Omit<ForRootOptions, 'loggerKey'>>
    | Omit<ForRootOptions, 'loggerKey'>;

  /**
   * Event logger inject key.
   */
  loggerKey?: any;
}
