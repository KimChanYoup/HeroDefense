#!/bin/sh
# Disaster recovery restore script
# Usage: ./restore.sh <backup_file.sql.gz>
#   or:  ./restore.sh          (restores the latest backup)
#
# Run from the project root:
#   docker compose exec backup sh /restore.sh
#   docker compose exec backup sh /restore.sh /backups/herodefense_20240101_020000.sql.gz

BACKUP_DIR="/backups"

if [ -n "$1" ]; then
  BACKUP_FILE="$1"
else
  BACKUP_FILE=$(ls -t "$BACKUP_DIR"/*.sql.gz 2>/dev/null | head -n 1)
fi

if [ -z "$BACKUP_FILE" ] || [ ! -f "$BACKUP_FILE" ]; then
  echo "ERROR: No backup file found. Specify a file or ensure backups exist in $BACKUP_DIR"
  exit 1
fi

echo "Restoring from: $BACKUP_FILE"
echo "Target DB:      $POSTGRES_DB on host db"

gunzip -c "$BACKUP_FILE" | psql -h db -U "$POSTGRES_USER" "$POSTGRES_DB"

if [ $? -eq 0 ]; then
  echo "[$(date)] SUCCESS: Restore complete from $BACKUP_FILE"
else
  echo "[$(date)] ERROR: Restore failed"
  exit 1
fi
