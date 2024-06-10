import { AuthenticatedUser } from '@/lib/users';
import { cookies } from 'next/headers';
import NavLink from './NavLink';

export default function NavBar() {
  const userCookie = cookies().get('user');
  const user: AuthenticatedUser = userCookie
    ? JSON.parse(userCookie.value)
    : null;

  return (
    <nav>
      <ul className="flex gap-2">
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
            <span className="text-orange-800">{user.email}</span>
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
