'use server';

import { ActionError } from '@/lib/actions';
import { getUserFromSession } from '@/lib/auth';
import { CreateCommentData, createComment } from '@/lib/comments';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCommentAction(
  formData: FormData
): Promise<undefined | ActionError> {
  const user = await getUserFromSession();
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const data: CreateCommentData = {
    slug: formData.get('slug') as string,
    userId: user.id,
    message: formData.get('message') as string,
  };
  const error = validate(data);
  if (error) {
    return { isError: true, message: error };
  }
  const comment = await createComment(data);
  console.log(comment);
  revalidatePath(`/reviews/${data.slug}`);
  redirect(`/reviews/${data.slug}`);
}

function validate(data: CreateCommentData): string | undefined {
  if (!data.message) {
    return 'Comment field is required';
  }
  if (data.message.length > 500) {
    return 'Comment field cannot be longer than 500 characters';
  }
}
