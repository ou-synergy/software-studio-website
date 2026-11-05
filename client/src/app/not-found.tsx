import Link from "next/link";
import { Shell } from "@/components/studio/shell";
import s from "@/components/studio/studio.module.css";
export default function NotFound() {
  return (
    <Shell>
      <main id="main-content" className={`${s.innerPage} ${s.messagePage}`}>
        <div className={s.container}>
          <h1>Page not found.</h1>
          <p className={s.lead}>
            This link may have changed. Let’s get you back to the Studio.
          </p>
          <Link className={s.textLink} href="/">
            Go to the homepage
          </Link>
        </div>
      </main>
    </Shell>
  );
}
