import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import CommentListSkeleton from '@/components/CommentListSkeleton';
import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { AuthenticatedUser, getUserFromSession } from '@/lib/auth';
import { getReview, getSlugs } from '@/lib/reviews';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }

  const user: AuthenticatedUser = await getUserFromSession();

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={review.image}
        alt=""
        priority
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
        <h2 className="font-bold flex gap-2 items-center text-xl">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comments
        </h2>
        {user ? (
          <CommentForm title={review.title} slug={slug} userName={user.name} />
        ) : (
          <p className="italic">
            <Link className="text-orange-800 hover:underline" href="/sign-in">
              Sign in
            </Link>{' '}
            to leave a comment
          </p>
        )}
        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList slug={slug} />
        </Suspense>
      </section>
    </>
  );
}
