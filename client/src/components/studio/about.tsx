import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { media } from "./data";
import { LinkedText } from "./content";
import { Arrow, JoinBand, Shell } from "./shell";
import s from "./studio.module.css";
interface Member {
  _id: string;
  name: string;
  role: string;
  description?: string;
  profilePicture?: SanityImageSource;
}
function group(role: string) {
  if (/chair/i.test(role)) return "Program leadership";
  if (/assistant/i.test(role)) return "Teaching assistants";
  if (/advisor/i.test(role)) return "Board of advisors";
  return role || "Our team";
}
export default async function AboutPage() {
  const members = await client.fetch<Member[]>(
    '*[_type == "adminTeamMember"] | order(order asc, _createdAt asc) {_id, name, role, description, profilePicture}',
    {},
    { next: { revalidate: 30 } },
  );
  const groups = new Map<string, Member[]>();
  for (const member of members) {
    const title = group(member.role);
    groups.set(title, [...(groups.get(title) || []), member]);
  }
  return (
    <Shell>
      <main className={s.innerPage} id="main-content">
        <section className={`${s.container} ${s.aboutIntro}`}>
          <div>
            <h1>Build something real.</h1>
            <p className={s.lead}>
              Software Studio is OU’s student startup incubator, operating
              through the OU Innovation Hub.
            </p>
            <p>
              Students from every major team up to turn ideas into software
              products—learning by building, testing, and launching together.
            </p>
            <Link className={s.textLink} href="/program">
              Explore the program <Arrow />
            </Link>
          </div>
          <Image
            src="/image/hero.jpeg"
            width={1600}
            height={822}
            priority
            sizes="(max-width:800px) 100vw,50vw"
            alt="OU Software Studio students collaborating in the classroom"
            className={s.aboutPhoto}
          />
        </section>
        <section
          className={`${s.container} ${s.people}`}
          aria-labelledby="people-title"
        >
          <h2 id="people-title">The people behind the Studio.</h2>
          {members.length === 0 && (
            <p>Team information will be available soon.</p>
          )}
          {Array.from(groups)
            .sort(([a], [b]) => {
              const order = [
                "Program leadership",
                "Teaching assistants",
                "Board of advisors",
              ];
              return (
                (order.includes(a) ? order.indexOf(a) : 3) -
                (order.includes(b) ? order.indexOf(b) : 3)
              );
            })
            .map(([title, people]) => (
              <section className={s.peopleGroup} key={title}>
                <h3>{title}</h3>
                <div className={s.peopleGrid}>
                  {people.map((person) => {
                    const description = (person.description || "").trim();
                    const intro = description.split(/\n/)[0];
                    const fullBio =
                      description.length > 200 || intro !== description;
                    return (
                      <article className={s.person} key={person._id}>
                        {person.profilePicture && (
                          <div className={s.portrait}>
                            <Image
                              src={media(person.profilePicture, 800)!}
                              alt={person.name}
                              fill
                              sizes="(max-width:650px) 100vw,(max-width:1000px) 50vw,33vw"
                              className={s.contain}
                            />
                          </div>
                        )}
                        <h4>{person.name}</h4>
                        <p className={s.personRole}>{person.role}</p>
                        {intro && (
                          <p
                            className={`${s.bioIntro} ${fullBio ? s.bioPreview : ""}`}
                          >
                            <LinkedText text={intro} />
                          </p>
                        )}
                        {fullBio && (
                          <details className={s.biography}>
                            <summary>
                              Read full bio
                              <span className={s.srOnly}>
                                {" "}
                                of {person.name}
                              </span>
                            </summary>
                            <div className={s.bioText}>
                              <LinkedText text={person.description || ""} />
                            </div>
                          </details>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
        </section>
        <JoinBand />
      </main>
    </Shell>
  );
}
