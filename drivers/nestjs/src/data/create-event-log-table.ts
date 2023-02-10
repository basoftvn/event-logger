import { Client } from 'pg';
import { createHash } from 'node:crypto';
import { LogLevels } from './log-levels';

const typeName = createHash('md5').update(LogLevels.join('-')).digest('hex');

const dropEnumSql = `DROP TYPE ${typeName}`;
const createEnumSql = `CREATE TYPE ${typeName} AS ENUM(${LogLevels.map(
  (level) => `'${level}'`,
).join(', ')})`;

const createTableSql = `
    CREATE TABLE IF NOT EXISTS "EventLogs"(
        id UUID PRIMARY KEY,
        type ${typeName} NOT NULL DEFAULT ${LogLevels[0]},
        scope VARCHAR(50) NOT NULL,
        message VARCHAR(64) NOT NULL,
        stack TEXT,
        detail TEXT,
        attachment JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        source VARCHAR(20) NOT NULL
    );
`;

const indicesCreationSql = [
  'CREATE INDEX ind_type ON "EventLogs"("type")',
  'CREATE INDEX ind_scope ON "EventLogs"("scope")',
  'CREATE INDEX ind_message ON "EventLogs"("message")',
  'CREATE INDEX ind_source ON "EventLogs"("source")',
];

export async function createEventLogTable(client: Client): Promise<void> {
  await client.query(dropEnumSql);
  await client.query(createEnumSql);
  await client.query(createTableSql);

  const indicesCreationWaitlist = [];

  for (const indexCreationSql of indicesCreationSql)
    indicesCreationWaitlist.push(client.query(indexCreationSql));

  await Promise.all(indicesCreationWaitlist);
}
