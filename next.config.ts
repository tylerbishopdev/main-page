import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  /* The album title is misspelled on purpose, so the spellings people will
   * actually type all land on the poster. */
  async redirects() {
    return [
      { source: "/artificial-originals", destination: "/articifical-originals", permanent: true },
      { source: "/articifical", destination: "/articifical-originals", permanent: true },
      { source: "/album", destination: "/articifical-originals", permanent: true },
      { source: "/vinyl", destination: "/articifical-originals", permanent: true },
    ];
  },
};

export default nextConfig;
