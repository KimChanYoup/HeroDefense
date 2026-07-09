import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+$/, {
    message: 'Username can only contain letters, numbers, underscores, and Korean characters',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100_000)
  @Matches(/^(https?:\/\/[^\s]+|data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+)$/, {
    message: 'Avatar URL must be a valid URL or image data URL',
  })
  avatarUrl?: string;
}
