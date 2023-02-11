import { ClientConfig } from 'pg';

export interface ForRootOptions {
  /**
   * Database connection information. Event logger uses Postgres database only!
   */
  connection: {
    /**
     * Address of database.
     */
    host: string;

    /**
     * Database port.
     */
    port: number;

    /**
     * Username.
     */
    username: string;

    /**
     * Password.
     */
    password: string;

    /**
     * Database name.
     */
    name: string;

    options?: Pick<
      ClientConfig,
      | 'connectionTimeoutMillis'
      | 'idle_in_transaction_session_timeout'
      | 'keepAlive'
      | 'keepAliveInitialDelayMillis'
      | 'query_timeout'
      | 'ssl'
      | 'statement_timeout'
    >;
  };

  /**
   * Event logger inject key.
   */
  loggerKey?: any;
}
