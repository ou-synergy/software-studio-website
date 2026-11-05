"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { JOIN, INVEST, DISCORD } from "./data";
import { useCollection } from "./use-collection";
import s from "./studio.module.css";
export function Arrow() {
  return <ArrowRightIcon width={20} height={20} aria-hidden="true" />;
}
export function Header({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  const light = !home || scrolled || open;
  return (
    <header className={`${s.header} ${light ? s.lightHeader : ""}`}>
      <a className={s.skip} href="#main-content">
        Skip to content
      </a>
      <div className={s.headerInner}>
        <Link href="/" aria-label="Software Studio home">
          <Image
            src={`/image/SoftwareStudioLogo${light ? "Black" : "White"}.png`}
            width={170}
            height={72}
            className={s.navLogo}
            alt="OU William Kerber Software Studio"
            priority
          />
        </Link>
        <nav className={s.desktopNav} aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/about-us">About</Link>
          <Link href="/startups">Startups</Link>
          <Link href="/blog">Updates</Link>
        </nav>
        <div className={s.headerActions}>
          <a href={INVEST} target="_blank" rel="noopener noreferrer">
            Invest
          </a>
          <a
            className={s.button}
            href={JOIN}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign Up
          </a>
        </div>
        <button
          ref={menuButton}
          className={s.menuToggle}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="studio-mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon width={28} /> : <Bars3Icon width={28} />}
        </button>
      </div>
      {open && (
        <nav
          id="studio-mobile-nav"
          className={s.mobileNav}
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              menuButton.current?.focus();
            }
          }}
          onClick={() => setOpen(false)}
        >
          <Link href="/">Home</Link>
          <Link href="/about-us">About</Link>
          <Link href="/startups">Startups</Link>
          <Link href="/blog">Updates</Link>
          <a href={JOIN} target="_blank" rel="noopener noreferrer">
            Sign Up
          </a>
          <a href={INVEST} target="_blank" rel="noopener noreferrer">
            Invest
          </a>
        </nav>
      )}
    </header>
  );
}
export function JoinBand() {
  return (
    <section className={s.join} id="join">
      <div className={s.container}>
        <h2>Your next big project starts here.</h2>
        <div className={s.actions}>
          <a
            className={`${s.button} ${s.whiteButton}`}
            href={JOIN}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Software Studio
          </a>
          <a
            className={`${s.button} ${s.outlineButton}`}
            href={DISCORD}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </a>
        </div>
      </div>
    </section>
  );
}
interface Contact {
  _id: string;
  prefix?: string;
  fullName: string;
  email: string;
}
export function Footer() {
  const { items, error, retry } = useCollection<Contact>("/api/contact-info");
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footerTop}>
          <Link href="/" aria-label="Software Studio home">
            <Image
              src="/image/SoftwareStudioLogoWhite.png"
              width={220}
              height={94}
              alt="OU William Kerber Software Studio"
            />
          </Link>
          <nav aria-label="Footer navigation">
            <Link href="/startups">Startups</Link>
            <a href="/#program">Program</a>
            <Link href="/about-us">About</Link>
            <Link href="/blog">Updates</Link>
            <a href={INVEST} target="_blank" rel="noopener noreferrer">
              Invest
            </a>
          </nav>
        </div>
        <div className={s.contacts}>
          {items.map((c) => (
            <div key={c._id}>
              <strong>
                {c.prefix ? `${c.prefix} ` : ""}
                {c.fullName}
              </strong>
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </div>
          ))}
          {error && <button onClick={retry}>Reload contact information</button>}
        </div>
        <div className={s.footerBottom}>
          <span>University of Oklahoma</span>
          <span>
            © {new Date().getFullYear()} OU William Kerber Software Studio
          </span>
        </div>
      </div>
    </footer>
  );
}
export function Shell({
  children,
  home = false,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={s.studio}>
      <Header home={home} />
      {children}
      <Footer />
    </div>
  );
}
