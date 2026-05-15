#!/bin/sh
set -e

echo "⏳ DB 연결 대기 중..."
until npx prisma db push --accept-data-loss 2>&1; do
  echo "DB 아직 준비 안됨, 3초 후 재시도..."
  sleep 3
done

echo "✅ DB 스키마 적용 완료"
exec npm run start:dev
