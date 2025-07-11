/**
 * @author Hyun
 * @since 2025-06-10
 * @description: 로그인/회원가입 페이지에서 공통으로 사용되는 링크 컴포넌트(로그인하러가기, 회원가입 하러가기 같은..)
 */

import Link from 'next/link';

import { cn } from '@/shared/libs/utils/cn';

interface AuthLinkProps {
  label: string;
  linkText: string;
  href: string;
  className?: string;
}

const DIV_STYLE = 'mt-2 flex flex-row items-center justify-center gap-x-4';
const LINK_STYLE = 'text-primary txt-md-regular underline';
const SPAN_STYLE = 'text-gray txt-md-small';

const AuthLink = ({ label, linkText, href, className }: AuthLinkProps) => {
  return (
    <div className={cn(DIV_STYLE, className)}>
      <span className={SPAN_STYLE}>{label}</span>
      <Link href={href} className={LINK_STYLE}>
        {linkText}
      </Link>
    </div>
  );
};

export default AuthLink;
