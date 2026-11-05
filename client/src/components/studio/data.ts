import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
export const JOIN = "https://forms.gle/NyJDpob5f1PpH8Fa7";
export const INVEST = "https://forms.gle/odC79LhjZ3me5QYu9";
export const DISCORD = "https://discord.gg/BUyTfQ9SBE";
export interface Startup {
  _id: string;
  title: string;
  tagline?: string;
  description: string;
  name: string;
  position?: string;
  year: number;
  batch: "Spring" | "Fall";
  image?: SanityImageSource;
  profilePicture?: SanityImageSource;
}
export interface Update {
  _id: string;
  title: string;
  imagePreview?: SanityImageSource;
  pdfUrl?: string;
}
const builder = imageUrlBuilder({
  projectId: "xwlnwgbx",
  dataset: "production",
});
export function media(source?: SanityImageSource, width = 1000) {
  return source
    ? builder.image(source).width(width).fit("max").auto("format").url()
    : undefined;
}
export function cohort(p: Startup) {
  return `${p.batch} ${p.year}`;
}
export function range(p: Startup) {
  return p.batch === "Fall"
    ? `Fall ${p.year} – Spring ${p.year + 1}`
    : `Spring ${p.year} – Fall ${p.year}`;
}
