import { AuthenticatedUser, getUserFromSession } from '@/lib/auth';
import NavLink from './NavLink';
import { SignOutButton } from './SignOutButton';

export default async function NavBar() {
  const user: AuthenticatedUser = await getUserFromSession();

  return (
    <nav>
      <ul className="flex gap-2 items-center">
        <li className="font-bold font-orbitron">
          <NavLink href="/">Indie Gamer</NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/reviews">Reviews</NavLink>
        </li>
        <li>
          <NavLink href="/about" prefetch={false}>
            About
          </NavLink>
        </li>
        <li>
          {user ? (
            <SignOutButton />
          ) : (
            <NavLink href="/sign-in" prefetch={false}>
              Sign-in
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
