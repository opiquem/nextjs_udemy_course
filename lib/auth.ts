import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { config } from './config';

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  email: string;
}

export async function signIn(data: SignInData) {
  return await console.log('signIn', data);
}

export async function getUserFromSession(): Promise<AuthenticatedUser> {
  const sessionTokenCookie = cookies().get(config.JWT_SESSION);
  console.log(process.env.JWT_SECRET);
  if (sessionTokenCookie) {
    try {
      const { payload } = await jwtVerify<AuthenticatedUser>(
        sessionTokenCookie.value,
        config.JWT_SECRET
      );

      return payload;
    } catch (error) {
      console.warn('Invalid JWT', error);
    }
  }
}

export function authenticate(data: SignInData) {
  if (data.email.endsWith('@gmail.com')) {
    return { email: data.email };
  }
}

export async function generateJWT(user: AuthenticatedUser) {
  const sessionToken = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(config.JWT_SECRET);

  return sessionToken;
}

export async function setSessionToken(user) {
  const sessionToken = await generateJWT(user);
  cookies().set(config.JWT_SESSION, sessionToken);
}
