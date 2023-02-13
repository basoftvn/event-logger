import { Client } from 'pg';
import { v4 } from 'uuid';

import { EventLogEntity } from './event-log.entity';
import { LogLevels } from './log-levels';

const writeEventLogSql = `
    INSERT INTO "EventLogs"(
        id, type, scope, message, stack, detail, attachment, source
    )
    VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
    )
`;

export async function writeEventLog(
  client: Client,
  log: EventLogEntity,
): Promise<void> {
  await client.query(writeEventLogSql, [
    log.id ?? v4(),
    log.type ?? LogLevels[0],
    log.scope ?? 'UnknownScope',
    log.message ?? 'Empty message',
    log.stack ?? 'no',
    log.detail,
    JSON.stringify(log.attachment ?? ''),
    log.source ?? 'UnknownSource',
  ]);
}
