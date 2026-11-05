import type { Metadata } from "next";
import AboutPage from "@/components/studio/about";
export const metadata: Metadata = { title: "About | Software Studio" };
export const revalidate = 30;
export default AboutPage;
