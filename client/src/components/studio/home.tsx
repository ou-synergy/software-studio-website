"use client";
import Image from "next/image";
import Link from "next/link";
import { JOIN, INVEST, media, Update } from "./data";
import { useCollection } from "./use-collection";
import { Arrow, JoinBand, Shell } from "./shell";
import StartupBrowser from "./startup-browser";
import s from "./studio.module.css";
function StudioUpdates() {
  const { items, loading, error, retry } = useCollection<Update>(
    "/api/announcements?limit=2",
  );
  return (
    <section
      className={`${s.container} ${s.updates}`}
      aria-labelledby="updates-title"
    >
      <div className={s.sectionHeader}>
        <h2 id="updates-title">From the Studio</h2>
        <Link className={s.textLink} href="/blog">
          View all updates <Arrow />
        </Link>
      </div>
      {loading && <p role="status">Loading updates…</p>}
      {error && <button onClick={retry}>Reload updates</button>}
      <div className={s.updateList}>
        {items.map((item) => (
          <article key={item._id}>
            <Link href={`/updates/${item._id}`} className={s.updateThumb}>
              {item.imagePreview && (
                <Image
                  src={media(item.imagePreview, 400)!}
                  alt={item.title}
                  fill
                  sizes="160px"
                  className={s.contain}
                />
              )}
            </Link>
            <div>
              <h3>
                <Link href={`/updates/${item._id}`}>{item.title}</Link>
              </h3>
              <Link className={s.textLink} href={`/updates/${item._id}`}>
                Read announcement <Arrow />
              </Link>
              {item.pdfUrl && (
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
          </article>
        ))}
      </div>
    </section>
  );
}
export default function StudioHome() {
  return (
    <Shell home>
      <main id="main-content">
        <section className={s.hero} id="home">
          <Image
            src="/image/hero.jpeg"
            alt="OU students working together in Software Studio"
            fill
            priority
            sizes="100vw"
            className={s.heroPhoto}
          />
          <div className={s.heroOverlay} />
          <div className={`${s.container} ${s.heroGrid}`}>
            <Image
              src="/image/SoftwareStudioLogoWhite.png"
              width={760}
              height={330}
              alt="OU William Kerber Software Studio"
              className={s.heroLogo}
              priority
            />
            <div className={s.heroCopy}>
              <p className={s.heroPrelude}>Be a Part of</p>
              <h1>Entrepreneurship and Innovation!</h1>
              <p className={s.heroDescription}>
                A two-semester program where OU students turn ideas into real
                software startups.
              </p>
              <div className={s.actions}>
                <a
                  className={`${s.button} ${s.whiteButton}`}
                  href={JOIN}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sign Up
                </a>
                <a
                  className={`${s.button} ${s.darkButton}`}
                  href={INVEST}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Invest
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className={`${s.container} ${s.startupSection}`} id="projects">
          <div className={s.sectionHeader}>
            <div>
              <h2>Built by OU students.</h2>
              <p className={s.lead}>
                Real teams. Real products. Ideas moving forward.
              </p>
            </div>
            <Link
              className={`${s.textLink} ${s.desktopBrowse}`}
              href="/startups"
            >
              Explore all startups <Arrow />
            </Link>
          </div>
          <StartupBrowser featured />
        </section>
        <section className={s.program} id="program">
          <div className={s.container}>
            <div className={s.programIntro}>
              <div>
                <h2>From idea to launch.</h2>
                <p className={s.lead}>
                  Find your team. Build, test, and grow together.
                </p>
              </div>
              <Link className={`${s.button} ${s.programLink}`} href="/program">
                Explore the program <Arrow />
              </Link>
            </div>
            <ol className={s.journey}>
              {["Pitch", "Team up", "Validate", "Build", "Launch", "Grow"].map(
                (step, i) => (
                  <li key={step}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ),
              )}
            </ol>
          </div>
        </section>
        <section className={`${s.container} ${s.participate}`} id="experience">
          <h2>There is a place for you here.</h2>
          <p className={s.roles}>Developers. Designers. Founders. Marketers.</p>
          <p className={s.lead}>
            All majors welcome. No idea, team, or coding experience required.
          </p>
          <p className={s.commitment}>
            Biweekly sessions. Real teamwork between meetings.
          </p>
          <Link className={s.textLink} href="/about-us">
            Meet the people behind Software Studio <Arrow />
          </Link>
          <div className={s.faq}>
            <details>
              <summary>What will I actually do?</summary>
              <p>
                Join a team, validate a problem, build a product, and test it
                with real users. Cohort sessions bring workshops, team
                presentations, and feedback.
              </p>
            </details>
            <details>
              <summary>Do I need an idea or coding experience?</summary>
              <p>
                No. Bring an idea or join a team. Design, business, marketing,
                and technical skills all have a place.
              </p>
            </details>
            <details>
              <summary>What is the commitment?</summary>
              <p>
                Participate in cohort sessions and contribute to your team
                between meetings. Your responsibilities depend on your role and
                your team’s milestones.
              </p>
            </details>
          </div>
        </section>
        <StudioUpdates />
        <JoinBand />
      </main>
    </Shell>
  );
}
