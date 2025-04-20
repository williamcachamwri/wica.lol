import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dive into Wica's thoughts, ideas, and stories on technology, design, and creativity.",
  openGraph: {
    title: "Blog",
    description: "Dive into Wica's thoughts, ideas, and stories on technology, design, and creativity.",
    url: "https://wica.lol/blog",
    images: [
      {
        url: "https://wica.lol/og/home?title=blog",
      },
    ],
  },
  twitter: {
    title: "Blog",
    description: "Dive into Wica's thoughts, ideas, and stories on technology, design, and creativity.",
    card: "summary_large_image",
    creator: "@williamcachamwri",
    images: ["https://wica.lol/og/home?title=blog"],
  },
};
