import Link from "next/link";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";

import { sanityFetch } from "@/sanity/lib/fetch";
import { moreStoriesQuery } from "@/sanity/lib/queries";

export default async function MoreStories(params: {
  skip: string;
  limit: number;
}) {
  const data = await sanityFetch({ query: moreStoriesQuery, params });

  return (
    <>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {data?.map((post) => {
          const { _id, title, slug, coverImage, excerpt, author, estimatedReadingTime, series, date } = post;
          return (
            <article key={_id}>
              <Link href={`/posts/${slug}`} className="group mb-5 block">
                <CoverImage image={coverImage} priority={false} />
              </Link>
              <h3 className="text-balance mb-3 text-3xl leading-snug">
                <Link href={`/posts/${slug}`} className="hover:underline">
                  {title}
                </Link>
              </h3>
               <div className="mb-4 text-lg md:mb-0 flex items-center justify-between">
                                    <div className="text-lg">
                                   {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
                                    </div>
                                    {/* <div className='ml-5 text-slate-500'>📖 {estimatedReadingTime ? estimatedReadingTime : '2'} mins</div> */}
                                    {series !== null && (
                                            <div className='text-[14px] m-1 md:text-lg'>
                                              
                                                    {/* <span>SERIES: </span>
                                                    <Link
                                                        href={"/series/"+post?.series?.slug?.current}
                                                        className='text-indigo-300 dark:text-red-300'
                                                    > */}
                                                       <span className="p-2 bg-indigo-200 rounded-md">{series?.title ?? "ADHD Acceptance"}</span>
                                                    {/* </Link> */}
                                                
                                            </div>
                                        )}
                             
                       </div>
              {excerpt && (
                <p className="text-pretty mb-4 text-lg leading-relaxed">
                  {excerpt}
                </p>
              )}
              {author && <Avatar name={author.name} picture={author.picture} />}
            </article>
          );
        })}
      </div>
    </>
  );
}
