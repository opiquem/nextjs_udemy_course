import { db } from './db';

interface Comment {
  id: string;
  slug: string;
  user: string;
  message: string;
  postedAt: Date;
}

export async function getComments(slug: string): Promise<Comment[]> {
  return await db.comment.findMany({
    where: { slug },
  });
}
