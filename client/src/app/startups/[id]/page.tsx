import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { Startup, media, range } from "@/components/studio/data";
import { JoinBand, Shell } from "@/components/studio/shell";
import s from "@/components/studio/studio.module.css";
export const dynamic = "force-dynamic";
function Description({ text }: { text: string }) {
  return (
    <div className={s.description}>
      {text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </div>
  );
}
export default async function StartupPage({
  params,
}: {
  params: { id: string };
}) {
  const p = await client.fetch<Startup | null>(
    '*[_type == "project" && _id == $id][0]',
    { id: params.id },
  );
  if (!p) notFound();
  return (
    <Shell>
      <main className={s.innerPage} id="main-content">
        <article className={s.container}>
          <Link href="/startups" className={s.textLink}>
            Back to startups
          </Link>
          <div className={s.detailHeader}>
            <p>{range(p)}</p>
            <h1>{p.title}</h1>
            <p className={s.lead}>{p.tagline}</p>
          </div>
          <div className={s.detailGrid}>
            {p.image && (
              <div className={s.detailImage}>
                <Image
                  src={media(p.image, 1400)!}
                  alt={`${p.title} product`}
                  fill
                  priority
                  sizes="(max-width:800px) 100vw,55vw"
                  className={s.contain}
                />
              </div>
            )}
            <div>
              <h2>What we’re building</h2>
              <Description text={p.description || ""} />
              <div className={s.team}>
                <h2>The team</h2>
                {p.profilePicture && (
                  <Image
                    src={media(p.profilePicture, 600)!}
                    alt={`${p.title} team or logo`}
                    width={350}
                    height={280}
                    className={s.teamImage}
                  />
                )}
                <p>{p.name}</p>
              </div>
            </div>
          </div>
        </article>
        <JoinBand />
      </main>
    </Shell>
  );
}
