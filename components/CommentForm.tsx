'use client';

import { createCommentAction } from '@/app/reviews/actions';
import { useFormState } from '@/lib/hooks';

export interface CommentFormProps {
  title: string;
  slug: string;
  userName: string;
}

export default function CommentForm({ slug, title, userName }: CommentFormProps) {
  const [state, handleSubmit] = useFormState(createCommentAction);

  return (
    <form
      onSubmit={handleSubmit}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <div className="flex">
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="user" value={userName} />
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <span>{userName}</span>
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea
          name="message"
          id="messageField"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      {state.error && <p className="text-red-600">{state?.error.message}</p>}
      <button
        type="submit"
        className="bg-orange-800 rounded px-2 py-1 self-center
                   text-slate-50 w-32 hover:bg-orange-700
                   disabled:bg-slate-500 disabled:text-slate-200 disabled:cursor-not-allowed"
        disabled={state.loading}
      >
        Submit
      </button>
    </form>
  );
}
