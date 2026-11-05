import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ContentBlock,
  ContentPhoto,
  publishedDate,
  RichContent,
} from "./content";
import { JoinBand, Shell } from "./shell";
import s from "./studio.module.css";
interface Post {
  title: string;
  publishedAt?: string;
  image?: SanityImageSource;
  body?: ContentBlock[];
}
export default async function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch<Post | null>(
    '*[_type == "post" && slug.current == $slug][0]',
    { slug: params.slug },
    { next: { revalidate: 30 } },
  );
  if (!post) notFound();
  return (
    <Shell>
      <main className={s.innerPage} id="main-content">
        <article className={`${s.container} ${s.storyArticle}`}>
          <Link className={s.textLink} href="/blog#stories-title">
            Back to stories
          </Link>
          <header className={s.articleHeader}>
            <h1>{post.title}</h1>
            {publishedDate(post.publishedAt) && (
              <time dateTime={post.publishedAt}>
                {publishedDate(post.publishedAt)}
              </time>
            )}
          </header>
          {post.image && (
            <ContentPhoto source={post.image} alt={post.title} priority />
          )}
          <div className={s.articleBody}>
            <RichContent value={post.body} />
          </div>
          <Link className={s.textLink} href="/blog">
            Back to all updates
          </Link>
        </article>
        <JoinBand />
      </main>
    </Shell>
  );
}
