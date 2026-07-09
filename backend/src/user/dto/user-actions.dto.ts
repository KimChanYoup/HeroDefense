import { Type } from 'class-transformer';
import { IsDefined, IsInt, Max, Min } from 'class-validator';

export class UpdateGoldDto {
  @Type(() => Number)
  @IsInt()
  @Min(-10_000_000)
  @Max(10_000_000)
  delta: number;
}

export class UpdateCrystalsDto {
  @Type(() => Number)
  @IsInt()
  @Min(-1_000_000)
  @Max(100_000)
  delta: number;
}

export class ProtagonistSaveDto {
  @IsDefined()
  saveData: unknown;
}

export class HeroSaveDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  templateId: number;

  @IsDefined()
  saveData: unknown;
}

export class ClaimLandRewardDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  stageId: number;
}
