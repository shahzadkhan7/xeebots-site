import type { Metadata } from "next";
import { themeInitScript } from "@/components/theme/theme-script";
import { fontClassNames } from "./fonts";
import "./globals.css";

const title = "Xeebots — AI automation & agent systems";
const description =
  "Xeebots designs and ships production AI agents, chat systems, and automation pipelines for teams who want the work done, not another dashboard to babysit.";

export const metadata: Metadata = {
  // Absolute base for the OG image URL. Set NEXT_PUBLIC_SITE_URL in production.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  icons: { icon: { url: "/favicon.ico", sizes: "32x32" } },
  openGraph: {
    type: "website",
    siteName: "Xeebots",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Xeebots" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the head script sets data-theme before React loads.
    <html lang="en" className={`${fontClassNames} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Without JS the Reveal observer never runs — show everything at rest. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
