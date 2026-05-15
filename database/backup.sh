#!/bin/sh
# Automated PostgreSQL backup script
# Runs daily via cron inside the backup container

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
BACKUP_FILE="${BACKUP_DIR}/herodefense_${TIMESTAMP}.sql.gz"
KEEP_DAYS=7

mkdir -p "$BACKUP_DIR"

pg_dump -h db -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "[$(date)] SUCCESS: ${BACKUP_FILE}"
  # Remove backups older than KEEP_DAYS days
  find "$BACKUP_DIR" -name "*.sql.gz" -mtime +${KEEP_DAYS} -delete
  echo "[$(date)] Retention cleanup done (kept last ${KEEP_DAYS} days)"
else
  echo "[$(date)] ERROR: Backup failed"
  rm -f "$BACKUP_FILE"
  exit 1
fi
