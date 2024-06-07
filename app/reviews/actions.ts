'use server';

import { createComment } from '@/lib/comments';
import { revalidatePath } from 'next/cache';

export async function createCommentAction(formData: FormData) {
  const slug = formData.get('slug') as string;

  const commentData = {
    slug,
    user: formData.get('user') as string,
    message: formData.get('message') as string,
  };

  const error = validate(formData);

  if (error) {
    return { isError: true, message: error.message };
  }

  createComment(commentData);
  revalidatePath(`/reviews/${slug}`);
}

function validate(data: FormData) {
  const user = data.get('user') as string;
  const message = data.get('message') as string;

  if (!user) {
    return { isError: true, message: 'Please enter your name' };
  }

  if (user.length > 50) {
    return { isError: true, message: 'Name is too long' };
  }

  if (!message) {
    return { isError: true, message: 'Please enter your comment' };
  }

  if (message.length > 500) {
    return { isError: true, message: 'Comment is too long' };
  }
}
