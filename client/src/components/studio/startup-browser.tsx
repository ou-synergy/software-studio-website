"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Startup, cohort, media } from "./data";
import { useCollection } from "./use-collection";
import { Arrow } from "./shell";
import s from "./studio.module.css";
export default function StartupBrowser({
  featured = false,
}: {
  featured?: boolean;
}) {
  const { items, loading, error, retry } =
    useCollection<Startup>("/api/projects");
  const [selected, setSelected] = useState("all"),
    [search, setSearch] = useState("");
  const cohorts = Array.from(
    new Set(
      items
        .filter((p) => p.year && p.batch)
        .sort(
          (a, b) =>
            b.year - a.year ||
            (a.batch === b.batch ? 0 : a.batch === "Fall" ? -1 : 1),
        )
        .map(cohort),
    ),
  );
  const matches = items.filter(
    (p) =>
      (selected === "all" || cohort(p) === selected) &&
      `${p.title} ${p.name} ${p.description}`
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
  );
  const curated = ["WeTodos", "OpenHour", "Vigil"];
  const visible =
    featured && selected === "all"
      ? matches
          .filter((p) => curated.includes(p.title))
          .sort((a, b) => curated.indexOf(a.title) - curated.indexOf(b.title))
      : featured
        ? matches.slice(0, 3)
        : matches;
  return (
    <div>
      <div className={s.filters}>
        <div
          className={s.cohortButtons}
          role="group"
          aria-label="Filter startups by cohort"
        >
          {[["all", "All cohorts"], ...cohorts.map((c) => [c, c])].map(
            ([value, label]) => (
              <button
                key={value}
                aria-pressed={selected === value}
                onClick={() => setSelected(value)}
              >
                {label}
              </button>
            ),
          )}
        </div>
        <label className={s.mobileFilter}>
          Cohort
          <select
            aria-label="Cohort"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="all">All cohorts</option>
            {cohorts.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        {!featured && (
          <label className={s.search}>
            Search startups
            <input
              type="search"
              placeholder="Startup, team member, or idea"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        )}
      </div>
      <div role="status" className={s.resultStatus}>
        {loading
          ? "Loading startups…"
          : error
            ? "We could not load the startups."
            : !featured
              ? `${matches.length} startup${matches.length === 1 ? "" : "s"}`
              : ""}
      </div>
      {error && (
        <button className={s.button} onClick={retry}>
          Try again
        </button>
      )}
      {!loading && !error && !visible.length && (
        <p>No startups match this selection. Try another cohort or search.</p>
      )}
      <div className={s.projectGrid}>
        {visible.map((p) => (
          <article key={p._id} className={s.project}>
            <Link
              href={`/startups/${p._id}`}
              className={s.productImage}
              aria-label={`View ${p.title}`}
            >
              {p.image ? (
                <Image
                  src={media(p.image)!}
                  alt={`${p.title} product`}
                  fill
                  sizes="(max-width:650px) 100vw,(max-width:1000px) 50vw,33vw"
                  className={s.contain}
                />
              ) : (
                <span className={s.noImage}>
                  {p.title}
                  <small>Product preview coming soon</small>
                </span>
              )}
            </Link>
            <div className={s.projectHeading}>
              <h3>
                <Link href={`/startups/${p._id}`}>{p.title}</Link>
              </h3>
              <span>{cohort(p)}</span>
            </div>
            <p>{p.tagline || p.description.split(/(?<=[.!?])\s/)[0]}</p>
            <Link className={s.textLink} href={`/startups/${p._id}`}>
              View startup <Arrow />
            </Link>
          </article>
        ))}
      </div>
      {featured && (
        <Link className={`${s.textLink} ${s.browseLink}`} href="/startups">
          Explore all startups <Arrow />
        </Link>
      )}
    </div>
  );
}
