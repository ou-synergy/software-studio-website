import type { Metadata } from "next";
import StoryPage from "@/components/studio/story";
export const metadata: Metadata = { title: "Studio story | Software Studio" };
export const revalidate = 30;
export default StoryPage;
