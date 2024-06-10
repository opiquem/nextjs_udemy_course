'use server';

import { ActionError } from '@/lib/actions';
import { redirect } from 'next/navigation';
import { SignInData, authenticate, deleteSessionToken, setSessionToken } from '../../lib/auth';

export async function signInAction(
  formData: FormData
): Promise<undefined | ActionError> {
  const registerData: SignInData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const error = validate(registerData);

  if (error) {
    return { isError: true, message: error };
  }

  const user = authenticate(registerData);

  if (!user) {
    return { isError: true, message: 'Invalid email or password' };
  }

  await setSessionToken(user);

  redirect('/');
}

function validate(data: SignInData): string | undefined {
  if (!data.email) {
    return 'Email field is required';
  }
  if (data.email.length > 100) {
    return 'Name field cannot be longer than 100 characters';
  }
  if (!data.password) {
    return 'Password field is required';
  }
  if (data.password.length > 50) {
    return 'Comment field cannot be longer than 50 characters';
  }
}

export async function signOut() {
  deleteSessionToken();
  redirect('/');
}