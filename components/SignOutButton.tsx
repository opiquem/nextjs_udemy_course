import { signOut } from '@/app/sign-in/actions';

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button className="rounded bg-orange-700 py-2 px-4 text-sm text-white">
        Sign Out
      </button>
    </form>
  );
}
