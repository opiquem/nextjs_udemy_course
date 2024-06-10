import { db } from './db';
import { User } from './users';

interface Comment {
  id: string;
  slug: string;
  userId: string;
  message: string;
  postedAt: Date;
}

interface CommentWithUser extends Comment {
  user: Pick<User, 'name'>;
}

export type CreateCommentData = Omit<Comment, 'id' | 'postedAt' | 'user'> & {
  userId: string;
};

export async function createComment({
  slug,
  userId,
  message,
}: CreateCommentData) {
  return await db.comment.create({
    data: {
      slug,
      userId,
      message,
    },
  });
}

export async function getComments(slug: string): Promise<CommentWithUser[]> {
  return await db.comment.findMany({
    where: { slug },
    orderBy: { postedAt: 'desc' },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
}
