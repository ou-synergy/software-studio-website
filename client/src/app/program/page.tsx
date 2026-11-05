import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, JoinBand, Shell } from "@/components/studio/shell";
import { JOIN } from "@/components/studio/data";
import s from "@/components/studio/studio.module.css";
export const metadata: Metadata = { title: "The program | Software Studio" };
const stages = [
  [
    "Pitch & team up",
    "Bring a problem worth solving, pitch your idea, or join a team. Find people whose skills complement yours.",
  ],
  [
    "Validate & build",
    "Talk to potential users, test your assumptions, and build the essential version of your product.",
  ],
  [
    "Launch & grow",
    "Put your product in people’s hands. Use feedback to improve it, find users, and present what you’ve learned.",
  ],
];
export default function ProgramPage() {
  return (
    <Shell>
      <main className={s.innerPage} id="main-content">
        <div className={s.container}>
          <header className={s.pageIntro}>
            <h1>From idea to launch.</h1>
            <p className={s.lead}>
              Two semesters. A team of your own. A product worth building.
            </p>
          </header>
          <ol className={s.programStages}>
            {stages.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
          <section className={s.programCommitment}>
            <h2>The work happens between sessions.</h2>
            <div>
              <p>
                Biweekly cohort sessions bring workshops, team presentations,
                and feedback. Between meetings, your team sets priorities,
                builds, and makes progress together.
              </p>
              <p>
                Bring curiosity and initiative. Take ownership of your role and
                communicate with your team.
              </p>
              <Link className={s.textLink} href="/startups">
                See what students are building <Arrow />
              </Link>
            </div>
          </section>
          <section className={s.programFaq} aria-labelledby="program-faq-title">
            <h2 id="program-faq-title">Before you join.</h2>
            <div className={s.faq}>
              <details>
                <summary>Who can participate?</summary>
                <p>
                  OU students of all majors. Developers, designers, marketers,
                  and future founders all have a place.
                </p>
              </details>
              <details>
                <summary>
                  Do I need an idea, team, or coding experience?
                </summary>
                <p>
                  No. Bring your own idea, find a team, or join other students.
                  You can learn unfamiliar skills as you build.
                </p>
              </details>
              <details>
                <summary>How much time should I commit?</summary>
                <p>
                  Attend cohort sessions and contribute between meetings. Your
                  workload depends on your role and your team’s milestones;
                  agree on responsibilities together.
                </p>
              </details>
              <details>
                <summary>How do I get involved?</summary>
                <p>
                  <a href={JOIN} target="_blank" rel="noopener noreferrer">
                    Fill out the interest form
                  </a>{" "}
                  to hear about cohort opportunities and information sessions.
                </p>
              </details>
            </div>
          </section>
        </div>
        <JoinBand />
      </main>
    </Shell>
  );
}
