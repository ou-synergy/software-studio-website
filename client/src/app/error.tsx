"use client";
import { Shell } from "@/components/studio/shell";
import s from "@/components/studio/studio.module.css";
export default function PageError({ reset }: { reset: () => void }) {
  return (
    <Shell>
      <main id="main-content" className={`${s.innerPage} ${s.messagePage}`}>
        <div className={s.container}>
          <h1>This page couldn’t load.</h1>
          <p className={s.lead}>Please try again in a moment.</p>
          <button className={`${s.button} ${s.primaryButton}`} onClick={reset}>
            Try again
          </button>
        </div>
      </main>
    </Shell>
  );
}
