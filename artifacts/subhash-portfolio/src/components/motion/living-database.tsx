import { useState, useEffect } from 'react';
import { Database, ShieldCheck, Zap } from 'lucide-react';

interface DbRecord {
  id: string;
  source: string;
  action: string;
  status: 'COMMITTED' | 'LEASED' | 'VERIFIED' | 'SYNCED';
  latency: string;
  timestamp: string;
}

const INITIAL_RECORDS: DbRecord[] = [
  { id: 'tx_8910', source: 'UPI-Gateway', action: 'CAS_BALANCE_RESERVE', status: 'COMMITTED', latency: '14ms', timestamp: '10:42:01.120' },
  { id: 'res_0442', source: 'eGovTalent', action: 'CLAUDE_PARSE_ANCHOR', status: 'VERIFIED', latency: '82ms', timestamp: '10:42:02.340' },
  { id: 'inv_9931', source: 'FlashSale', action: 'REDIS_SETNX_LOCK', status: 'LEASED', latency: '4ms', timestamp: '10:42:03.010' },
  { id: 'mob_7718', source: 'EternitySync', action: 'ROOM_FIRESTORE_REPLY', status: 'SYNCED', latency: '28ms', timestamp: '10:42:04.590' },
];

const NEW_RECORD_POOL: DbRecord[] = [
  { id: 'sec_1102', source: 'StealthVault', action: 'BIOMETRIC_ENCLAVE_OPEN', status: 'VERIFIED', latency: '9ms', timestamp: '10:42:06.180' },
  { id: 'dag_5510', source: 'SpamDAG', action: 'JACCARD_SUBNET_GATED', status: 'COMMITTED', latency: '31ms', timestamp: '10:42:07.450' },
  { id: 'doc_3301', source: 'PDF-Suite', action: 'BULLMQ_ASYNC_SLICE', status: 'SYNCED', latency: '19ms', timestamp: '10:42:09.110' },
  { id: 'emi_6620', source: 'PAR-Pipeline', action: 'CQRS_PROJECTION_UPDATE', status: 'COMMITTED', latency: '22ms', timestamp: '10:42:10.980' },
];

export function LivingDatabase({ className = '' }: { className?: string }) {
  const [records, setRecords] = useState<DbRecord[]>(INITIAL_RECORDS);
  const [latestId, setLatestId] = useState<string | null>(null);

  useEffect(() => {
    let poolIndex = 0;
    const interval = setInterval(() => {
      const nextRecord = NEW_RECORD_POOL[poolIndex % NEW_RECORD_POOL.length];
      poolIndex++;

      setLatestId(nextRecord.id);
      setRecords((prev) => [nextRecord, ...prev.slice(0, 3)]);

      // Clear highlight after 1.8s
      setTimeout(() => {
        setLatestId(null);
      }, 1800);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`living-database-box glass-card ${className}`}>
      {/* DB Header */}
      <div className="db-titlebar">
        <div className="db-title-left">
          <Database size={14} className="db-icon text-orange" />
          <span className="db-name">PostgreSQL / Redis Cluster Telemetry</span>
        </div>
        <div className="db-status-badge">
          <Zap size={12} />
          <span>Continuous Replicas Active</span>
        </div>
      </div>

      {/* DB Table */}
      <div className="db-table-container">
        <table className="db-telemetry-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Pipeline Event</th>
              <th>State</th>
              <th>Latency</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => {
              const isNew = r.id === latestId;
              return (
                <tr key={r.id} className={isNew ? 'row-new-insert' : ''}>
                  <td className="cell-id font-mono tabular-nums">{r.id}</td>
                  <td className="cell-source font-mono">{r.source}</td>
                  <td className="cell-action font-mono">{r.action}</td>
                  <td>
                    <span className={`db-pill db-pill-${r.status.toLowerCase()}`}>
                      <ShieldCheck size={10} />
                      {r.status}
                    </span>
                  </td>
                  <td className="cell-latency font-mono tabular-nums">{r.latency}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
