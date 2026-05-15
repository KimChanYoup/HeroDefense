import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  // 영문/숫자/밑줄 + 한국어(한글 완성형·자모) 허용, 공백/특수문자 금지
  @Matches(/^[a-zA-Z0-9_\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+$/, {
    message: 'Username can only contain letters, numbers, underscores, and Korean characters',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
