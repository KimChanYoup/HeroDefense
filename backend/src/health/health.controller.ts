import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  private getBackupStatus(): { status: string; lastBackup: string | null; count: number } {
    const backupDir = '/backups';
    try {
      if (!fs.existsSync(backupDir)) {
        return { status: 'no_backups', lastBackup: null, count: 0 };
      }
      const files = fs.readdirSync(backupDir)
        .filter(f => f.endsWith('.sql.gz'))
        .map(f => ({
          name: f,
          mtime: fs.statSync(path.join(backupDir, f)).mtime,
        }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

      if (files.length === 0) {
        return { status: 'no_backups', lastBackup: null, count: 0 };
      }

      const lastBackupAge = Date.now() - files[0].mtime.getTime();
      const oneDayMs = 24 * 60 * 60 * 1000;
      const status = lastBackupAge < oneDayMs * 2 ? 'ok' : 'stale';

      return { status, lastBackup: files[0].mtime.toISOString(), count: files.length };
    } catch {
      return { status: 'unknown', lastBackup: null, count: 0 };
    }
  }

  @Get()
  async check() {
    let dbOk = false;
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbOk = true;
    } catch {
      dbOk = false;
    }

    const backup = this.getBackupStatus();
    const allOk = dbOk;

    return {
      status: allOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        api: 'ok',
        database: dbOk ? 'ok' : 'error',
        backup: backup.status,
      },
      backup: {
        lastBackup: backup.lastBackup,
        fileCount: backup.count,
        retentionDays: 7,
        schedule: 'daily at 02:00 UTC',
      },
    };
  }
}
