import { z } from 'zod';

// 회원가입 스키마
// dev 풀 받기 전 여기에 만들고, 이후 이 파일 삭제하고 옮기기(src/shared/schemas/userAuth.schema.ts) - 회원가입 부분
export const SignupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일은 필수 입력입니다.' })
      .email({ message: '이메일 형식으로 작성해주세요.' }),
    nickname: z
      .string()
      .min(1, { message: '닉네임은 필수 입력입니다.' })
      .max(20, { message: '닉네임은 최대 20자까지 가능합니다.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호는 필수 입력입니다.' })
      .min(8, { message: '비밀번호는 최소 8자 이상입니다.' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
        message: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
      }),
    passwordCheck: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

export type SignupFormData = z.infer<typeof SignupSchema>;
