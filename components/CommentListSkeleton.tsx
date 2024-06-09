import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function CommentListSkeleton() {
  return (
    <ul className="border mt-3 rounded animate-pulse">
      {[1, 2, 3].map((index) => (
        <li
          key={index}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-50 even:bg-orange-200"
        >
          <div className="flex gap-3 items-center pb-1 text-slate-500">
            <UserCircleIcon className="h-6 w-6" />
            <div className="bg-slate-300 rounded h-3 w-24 animate-pulse" />
          </div>
          <div className="bg-slate-300 rounded h-3 w-2/3 animate-pulse py-1" />
        </li>
      ))}
    </ul>
  );
}
