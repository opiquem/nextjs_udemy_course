import { db } from './db';

interface Comment {
  id: string;
  slug: string;
  user: string;
  message: string;
  postedAt: Date;
}

export type CreateCommentData = Omit<Comment, 'id' | 'postedAt'>;

export async function createComment({
  slug,
  user,
  message,
}: CreateCommentData) {
  return await db.comment.create({
    data: {
      slug,
      user,
      message,
    },
  });
}

export async function getComments(slug: string): Promise<Comment[]> {
  return await db.comment.findMany({
    where: { slug },
    orderBy: { postedAt: 'desc' },
  });
}
