import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { config } from './config';

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
}

export async function signIn(data: SignInData) {
  return await console.log('signIn', data);
}

const decodeSessionToken = cache(async (sessionToken: string) => {
  try {
    const { payload } = await jwtVerify<AuthenticatedUser>(
      sessionToken,
      config.JWT_SECRET
    );

    return payload;
  } catch (error) {
    console.warn('Invalid JWT', error);
  }
});

export function getUserFromSession(): Promise<AuthenticatedUser | undefined> {
  const sessionToken = cookies().get(config.JWT_SESSION)?.value;

  if (sessionToken) {
   return decodeSessionToken(sessionToken);
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
    .setExpirationTime(config.EXPIRATION_DATE)
    .sign(config.JWT_SECRET);

  return sessionToken;
}

export async function setSessionToken({ id, email, name }: AuthenticatedUser) {
  const sessionToken = await generateJWT({ id, email, name });
  cookies().set(config.JWT_SESSION, sessionToken, {
    expires: config.EXPIRATION_DATE,
    httpOnly: true,
    sameSite: 'lax',
  });
}

export function deleteSessionToken() {
  cookies().delete(config.JWT_SESSION);
}
