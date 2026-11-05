import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { Update } from "@/components/studio/data";
import {
  ContentBlock,
  ContentPhoto,
  RichContent,
  safeHref,
} from "@/components/studio/content";
import { JoinBand, Shell } from "@/components/studio/shell";
import s from "@/components/studio/studio.module.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Announcement | Software Studio" };
interface Announcement extends Update {
  description?: ContentBlock[];
  link?: string;
  linkTitle?: string;
}
export default async function AnnouncementPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await client.fetch<Announcement | null>(
    '*[_type == "announcement" && _id == $id][0]{_id,title,imagePreview,description,link,linkTitle,"pdfUrl":pdf.asset->url}',
    { id: params.id },
  );
  if (!item) notFound();
  return (
    <Shell>
      <main className={s.innerPage} id="main-content">
        <article className={s.container}>
          <Link className={s.textLink} href={`/blog#announcement-${item._id}`}>
            Back to updates
          </Link>
          <header className={s.articleHeader}>
            <h1>{item.title}</h1>
          </header>
          <div className={s.announcementGrid}>
            {item.imagePreview && (
              <div className={s.announcementPoster}>
                <ContentPhoto
                  source={item.imagePreview}
                  alt={item.title}
                  priority
                />
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
            )}
            <div>
              <RichContent value={item.description} />
              {safeHref(item.link) && (
                <a
                  className={`${s.button} ${s.primaryButton}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.linkTitle || "Learn more"}
                </a>
              )}
              {!item.imagePreview && safeHref(item.pdfUrl) && (
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
        <JoinBand />
      </main>
    </Shell>
  );
}
