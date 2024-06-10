import { SignInData } from './auth';
import { db } from './db';

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export type CreateUserData = Omit<User, 'id'>;

export async function authenticateUser({ email, password }: SignInData) {
  return await db.user.findUnique({
    where: {
      email,
      password,
    },
  });
}

export async function createUser({ email, name, password }: CreateUserData) {
  return await db.user.create({
    data: {
      email,
      name,
      password,
    },
  });
}

// export async function getComments(slug: string): Promise<Comment[]> {
//   return await db.comment.findMany({
//     where: { slug },
//     orderBy: { postedAt: 'desc' },
//   });
// }
