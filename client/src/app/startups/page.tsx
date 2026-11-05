import type { Metadata } from "next";
import StartupBrowser from "@/components/studio/startup-browser";
import { JoinBand, Shell } from "@/components/studio/shell";
import s from "@/components/studio/studio.module.css";
export const metadata: Metadata = {
  title: "Student Startups | Software Studio",
};
export default function StartupsPage() {
  return (
    <Shell>
      <main id="main-content" className={s.innerPage}>
        <section className={s.container}>
          <h1>Built by OU students.</h1>
          <p className={s.lead}>
            Explore the teams turning ideas into real products.
          </p>
          <StartupBrowser />
        </section>
        <JoinBand />
      </main>
    </Shell>
  );
}
