import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { media, Update } from "./data";
import { ContentBlock, publishedDate, safeHref, textPreview } from "./content";
import { Arrow, JoinBand, Shell } from "./shell";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import s from "./studio.module.css";
interface Announcement extends Update {
  description?: ContentBlock[];
}
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  image?: SanityImageSource;
  body?: ContentBlock[];
}
export default async function UpdatesPage() {
  const [announcements, posts] = await Promise.all([
    client.fetch<Announcement[]>(
      '*[_type == "announcement"] | order(coalesce(order, 0) asc, _createdAt desc) {_id,title,imagePreview,description,"pdfUrl":pdf.asset->url}',
      {},
      { next: { revalidate: 30 } },
    ),
    client.fetch<Post[]>(
      '*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {_id,title,slug,publishedAt,image,body}',
      {},
      { next: { revalidate: 30 } },
    ),
  ]);
  return (
    <Shell>
      <main className={s.innerPage} id="main-content">
        <div className={s.container}>
          <header className={s.pageIntro}>
            <h1>From the Studio.</h1>
            <p className={s.lead}>
              Announcements, events, and stories from our community.
            </p>
          </header>
          <section
            className={s.archiveSection}
            aria-labelledby="announcements-title"
          >
            <h2 id="announcements-title">Announcements</h2>
            <div className={s.archiveList}>
              {announcements.map((item) => (
                <article
                  className={s.archiveRow}
                  key={item._id}
                  id={`announcement-${item._id}`}
                >
                  {item.imagePreview && (
                    <Link
                      href={`/updates/${item._id}`}
                      className={s.archiveImage}
                      aria-label={`Read ${item.title}`}
                    >
                      <Image
                        src={media(item.imagePreview, 600)!}
                        alt={item.title}
                        fill
                        sizes="(max-width:650px) 120px,220px"
                        className={s.contain}
                      />
                    </Link>
                  )}
                  <div>
                    <h3>
                      <Link href={`/updates/${item._id}`}>{item.title}</Link>
                    </h3>
                    <p className={s.archiveExcerpt}>
                      {textPreview(item.description)}
                    </p>
                    <div className={s.inlineLinks}>
                      <Link
                        className={s.textLink}
                        href={`/updates/${item._id}`}
                      >
                        Read announcement <Arrow />
                      </Link>
                      {safeHref(item.pdfUrl) && (
                        <a
                          className={s.pdfLink}
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
              {announcements.length === 0 && (
                <p>No announcements yet. Check back soon.</p>
              )}
            </div>
          </section>
          <section className={s.archiveSection} aria-labelledby="stories-title">
            <h2 id="stories-title">Studio stories</h2>
            <div className={s.storyList}>
              {posts.map((post) => (
                <article className={s.storyRow} key={post._id}>
                  {post.image && (
                    <Link
                      href={`/${post.slug.current}`}
                      className={s.storyImage}
                      aria-label={`Read ${post.title}`}
                    >
                      <Image
                        src={media(post.image, 1000)!}
                        alt={post.title}
                        fill
                        sizes="(max-width:800px) 100vw,40vw"
                        className={s.contain}
                      />
                    </Link>
                  )}
                  <div>
                    {publishedDate(post.publishedAt) && (
                      <time dateTime={post.publishedAt}>
                        {publishedDate(post.publishedAt)}
                      </time>
                    )}
                    <h3>
                      <Link href={`/${post.slug.current}`}>{post.title}</Link>
                    </h3>
                    <p className={s.archiveExcerpt}>{textPreview(post.body)}</p>
                    <Link className={s.textLink} href={`/${post.slug.current}`}>
                      Read story <Arrow />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            {posts.length === 0 && (
              <p>Stories from the Studio will appear here.</p>
            )}
          </section>
        </div>
        <JoinBand />
      </main>
    </Shell>
  );
}
