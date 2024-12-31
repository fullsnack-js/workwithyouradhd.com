import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Avatar from "../../avatar";
import CoverImage from "../../cover-image";
import DateComponent from "../../date";
import MoreStories from "../../more-stories";
import PortableText from "../../portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: { slug: string };
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await sanityFetch({ query: postQuery, params, stega: false });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const [post, settings] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-5">
    <div className="flex items-center justify-between mb-16 mt-10">
      <h2 className=" text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          {settings?.title || demo.title}
        </Link>
      </h2>
      <div className="flex items-center gap-x-4 md:gap-x-6">
                <a
                  href="https://calendly.com/workwithyouradhd/30min"
                  className="rounded-md bg-orange-400 px-2.5 md:px-3.5 py-1.5 md:py-2.5 text-sm md:text-md lg:text-lg font-semibold text-white shadow-sm hover:bg-orange-500 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
                >
                  Free Consult
                </a>
                <a href={"mailto:workwithyouradhd@gmail.com"} className="rounded-md text-sm md:text-md lg:text-lg px-2.5 md:px-3.5 py-1 md:py-2 bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-200 font-semibold leading-6 text-gray-800">
                  Contact <span className="hidden sm:absolute" aria-hidden="true">→</span>
                </a>
             
      <a href={"https://workwithyouradhd.com/posts"} className="hover:underline font-semibold text-sm md:text-md lg:text-lg ">
          Blog
        </a>
      </div>
      </div>
      <article>
        <h1 className="text-balance mb-12 text-4xl font-bold leading-tight tracking-tighter md:text-5xl md:leading-none lg:text-6xl">
          {post.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage image={post.coverImage} priority />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg flex items-center justify-between">
            <div className="text-lg">
              <DateComponent dateString={post.date} />
            </div>
            <div className='ml-5 text-slate-500'>📖 {post.estimatedReadingTime ? post.estimatedReadingTime : '2'} mins</div>
            {post?.series !== null && (
                    <div className='text-[14px] m-1 md:text-lg'>
                      
                            {/* <span>SERIES: </span>
                            <Link
                                href={"/series/"+post?.series?.slug?.current}
                                className='text-indigo-300 dark:text-red-300'
                            > */}
                               <span className="p-2 bg-indigo-200 rounded-md">{post?.series?.title}</span>
                            {/* </Link> */}
                        
                    </div>
                )}
          </div>
         

        </div>
        {post.body?.length && (
          <PortableText
            className="mx-auto max-w-2xl"
            value={post.body as PortableTextBlock[]}
          />
        )}
      </article>
      <aside>
        <hr className="border-accent-2 mb-24 mt-28" />
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          Recent Stories
        </h2>
        <Suspense>
          <MoreStories skip={post._id} limit={2} />
        </Suspense>
      </aside>
    </div>
  );
}
