import type { Metadata } from 'next';
import Heading from '@/components/Heading';
import SignInForm from '@/components/SignInForm';

export const metadata: Metadata = {
  title: 'About',
};

export default function SignInPage() {
  return (
    <>
      <Heading>Sign in page</Heading>
      <SignInForm />
    </>
  );
}
