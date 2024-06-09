export interface SignInData {
  email: string;
  password: string;
}

export async function signIn(data: SignInData) {
  return await console.log('signIn', data);
}
