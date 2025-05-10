import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photography collection by William, capturing special moments and interesting perspectives.",
  openGraph: {
    title: "Photos",
    description: "Photography collection by William, capturing special moments and interesting perspectives.",
    url: "https://wica.lol/photos",
    images: [
      {
        url: "https://wica.lol/og/home?title=photos",
      },
    ],
  },
  twitter: {
    title: "Photos",
    description: "Photography collection by William, capturing special moments and interesting perspectives.",
    card: "summary_large_image",
    creator: "@williamcachamwri",
    images: ["https://wica.lol/og/home?title=photos"],
  },
};