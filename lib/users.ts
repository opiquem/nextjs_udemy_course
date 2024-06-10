import { compare, hash } from 'bcrypt';
import { SignInData } from './auth';
import { db } from './db';

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

export interface CreateUserData extends Omit<User, 'id' | 'passwordHash'> {
  password: string;
}

export async function authenticateUser({ email, password }: SignInData) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user && (await compare(password, user.passwordHash))) {
    return user;
  }
}

export async function createUser({ email, name, password }: CreateUserData) {
  const passwordHash = await hash(password, 10);

  return await db.user.create({
    data: {
      email,
      name,
      passwordHash,
    },
  });
}

// export async function getComments(slug: string): Promise<Comment[]> {
//   return await db.comment.findMany({
//     where: { slug },
//     orderBy: { postedAt: 'desc' },
//   });
// }
