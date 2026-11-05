import Image from "next/image";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { media } from "./data";
import s from "./studio.module.css";

export interface ContentImage {
  _type: "image";
  _key?: string;
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
}
export type ContentBlock = PortableTextBlock | ContentImage;
export function safeHref(value?: string) {
  return value && /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(value)
    ? value
    : undefined;
}
export function textPreview(value?: ContentBlock[], max = 210) {
  const text = (value || [])
    .filter((block): block is PortableTextBlock => block._type === "block")
    .flatMap((block) => block.children.map((child) => child.text || ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max
    ? `${text.slice(0, max).replace(/\s+\S*$/, "")}…`
    : text;
}
export function publishedDate(value?: string) {
  if (!value || Number.isNaN(Date.parse(value))) return null;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
export function ContentPhoto({
  source,
  alt,
  priority = false,
  className,
}: {
  source: SanityImageSource;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const ref =
    typeof source === "object" && source && "asset" in source
      ? (source.asset as { _ref?: string })?._ref
      : undefined;
  const dimensions = ref?.match(/-(\d+)x(\d+)-/);
  return (
    <Image
      src={media(source, 1600)!}
      alt={alt}
      width={dimensions ? Number(dimensions[1]) : 1200}
      height={dimensions ? Number(dimensions[2]) : 900}
      sizes="(max-width:800px) 100vw, (max-width:1200px) 80vw, 1100px"
      priority={priority}
      className={className || s.contentPhoto}
    />
  );
}
export function LinkedText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(
          /(https?:\/\/[^\s]+|www\.[^\s]+|[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,})/g,
        )
        .map((part, i) => {
          const email = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(part);
          const href = email
            ? `mailto:${part}`
            : part.startsWith("www.")
              ? `https://${part}`
              : /^https?:\/\//.test(part)
                ? part
                : undefined;
          return href ? (
            <a
              key={i}
              href={href}
              target={email ? undefined : "_blank"}
              rel={email ? undefined : "noopener noreferrer"}
            >
              {part}
            </a>
          ) : (
            part
          );
        })}
    </>
  );
}
export function RichContent({ value }: { value?: ContentBlock[] }) {
  const blocks = (value || []).filter(
    (block) =>
      block._type !== "block" ||
      (block as PortableTextBlock).children.some((child) => child.text?.trim()),
  );
  return (
    <div className={s.richContent}>
      <PortableText
        value={blocks}
        components={{
          block: {
            h1: ({ children }) => <h2>{children}</h2>,
            h2: ({ children }) => <h2>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,
            blockquote: ({ children }) => <blockquote>{children}</blockquote>,
          },
          marks: {
            link: ({ children, value }) => {
              const href = safeHref(value?.href);
              return href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  {children}
                </a>
              ) : (
                <>{children}</>
              );
            },
          },
          types: {
            image: ({ value }: { value: ContentImage }) => (
              <figure>
                <ContentPhoto
                  source={value}
                  alt={value.alt || "Software Studio"}
                />
                {value.caption && <figcaption>{value.caption}</figcaption>}
              </figure>
            ),
          },
        }}
      />
    </div>
  );
}
