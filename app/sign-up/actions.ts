'use server';

import { ActionError } from '@/lib/actions';
import { CreateUserData, createUser } from '@/lib/users';
import { redirect } from 'next/navigation';
import { setSessionToken } from '../../lib/auth';

export async function signUpAction(
  formData: FormData
): Promise<undefined | ActionError> {
  const registerData: CreateUserData = {
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    password: formData.get('password') as string,
  };

  const error = validate(registerData);

  if (error) {
    return { isError: true, message: error };
  }
  try {
    const user = await createUser(registerData);

    if (!user) {
      return { isError: true, message: 'Something went wrong' };
    }

    await setSessionToken(user);
  } catch (error) {
    return { isError: true, message: 'User with this email already exists' };
  }

  redirect('/');
}

function validate(data: CreateUserData): string | undefined {
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
  if (data.name.length > 50) {
    return 'Name field cannot be longer than 50 characters';
  }
  if (!data.name) {
    return 'Name field is required';
  }
}
