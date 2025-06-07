'use client';

import { useRouter } from 'next/navigation';
import { SignupSchema, SignupFormData } from '../schemas/signup.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { post } from '@/shared/libs/api/apiClient';

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log(data);

    try {
      const response = await post('auth/signup', {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
        passwordConfirmation: data.passwordCheck,
      });
      console.log('회원가입 응답: ', response);
      alert('회원가입 성공!'); // 추후 shadcn 컴포넌트 적용할 예정
      //   const response = await ky
      //     .post('https://winereview-api.vercel.app/15-7/auth/signup', {
      //       json: {
      //         email: data.email,
      //         nickname: data.nickname,
      //         password: data.password,
      //         passwordConfirmation: data.passwordCheck,
      //       },
      //     })
      //     .json();
      //   alert('회원가입 성공!');

      //   console.log('회원가입 응답: ', response);
    } catch (error: any) {
      if (error.response) {
        const errorMsg = await error.response.json();
        console.log(errorMsg);
        alert(errorMsg.message || '회원가입에 실패했습니다.');
      } else {
        alert('네트워크 오류 또는 알 수 없는 에러가 발생했습니다.');
        console.error(error);
      }
    }

    //router.push('/login'); // 그러면 login 페이지는 어디에 만듬? 테스트 페이지로
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4 min-h-screen'>
      <Image
        src='/images/logo/image.svg'
        alt='logo'
        width={300}
        height={56}
        className='mb-10'
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg-regular'>이메일</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='whyne@email.com'
                    className='h-16 text-md-regular'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-md-regular text-primary' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg-regular'>닉네임</FormLabel>
                <FormControl>
                  <Input
                    placeholder='whyne'
                    {...field}
                    className='h-16 text-md-regular'
                  />
                </FormControl>
                <FormMessage className='text-md-regular text-primary' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg-regular'>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='영문, 숫자, 특수문자(!@#$%^&*) 입력'
                    {...field}
                    className='h-16 text-md-regular'
                  />
                </FormControl>
                <FormMessage className='text-md-regular text-primary' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordCheck'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg-regular'>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='비밀번호 확인'
                    {...field}
                    className='h-16 text-md-regular'
                  />
                </FormControl>
                <FormMessage className='text-md-regular text-primary' />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            variant='primary'
            size='sm'
            className='flex mt-4'
          >
            가입하기
          </Button>
        </form>
      </Form>
      <div>
        계정이 이미 있으신가요?{' '}
        <Button variant='link' size='sm'>
          <Link href='/login'>로그인 하러가기</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm;
