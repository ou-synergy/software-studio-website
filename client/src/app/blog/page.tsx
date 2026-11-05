import type { Metadata } from "next";
import UpdatesPage from "@/components/studio/updates";
export const metadata: Metadata = { title: "Updates | Software Studio" };
export const revalidate = 30;
export default UpdatesPage;
