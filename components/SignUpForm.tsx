'use client';

import { signUpAction } from '@/app/sign-up/actions';
import { useFormState } from '@/lib/hooks';
import NavLink from './NavLink';

export default function SignUpForm() {
  const [state, handleSubmit] = useFormState(signUpAction);

  return (
    <form
      onSubmit={handleSubmit}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
    >
      <NavLink href='/sign-in'>
        Already have an account? Sign in
      </NavLink>

      <div className="flex items-center">
        <label htmlFor="emailField" className="shrink-0 w-32">
          Your email
        </label>
        <input
          name="email"
          id="emailField"
          className="border px-2 py-1 rounded w-80"
          type="email"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="emailField" className="shrink-0 w-32">
          Your name
        </label>
        <input
          name="name"
          id="nameField"
          className="border px-2 py-1 rounded w-80"
          type="text"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="passwordField" className="shrink-0 w-32">
          Your password
        </label>
        <input
          name="password"
          id="passwordField"
          className="border px-2 py-1 rounded w-80"
          type="password"
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
