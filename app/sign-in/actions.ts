'use server';

import { ActionError } from '@/lib/actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthenticatedUser, SignInData } from './../../lib/users';

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

  // const user = await signIn(registerData);
  const user = authenticate(registerData);

  if (!user) {
    return { isError: true, message: 'Invalid email or password' };
  }

  cookies().set('user', JSON.stringify(user as AuthenticatedUser));
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

function authenticate(data: SignInData): AuthenticatedUser {
  if (data.email.endsWith('@gmail.com') && data.password === 'password') {
    return { email: data.email };
  }
}
