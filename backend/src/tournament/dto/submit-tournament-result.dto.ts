import { Type } from 'class-transformer';
import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class SubmitTournamentResultDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  matchId: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  winnerId: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1_000_000)
  player1Score: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1_000_000)
  player2Score: number;
}
