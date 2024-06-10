import type { Metadata } from 'next';
import Heading from '@/components/Heading';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';

export const metadata: Metadata = {
  title: 'About',
};

export default function SignUpPage() {
  return (
    <>
      <Heading>Sign up page</Heading>
      <SignUpForm />
    </>
  );
}
