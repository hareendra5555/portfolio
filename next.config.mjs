import { createContent } from "fuma-content/next";

// GitHub Pages serves project sites from /<repo>, so every asset and route has
// to be prefixed. Set NEXT_PUBLIC_BASE_PATH="" when deploying to a user site
// (<user>.github.io) or a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio_aug_2026";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  // Pages has no image optimizer — ship the originals.
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https",
      },
    ],
    unoptimized: true,
  },
  // Static HTML export: `next build` writes a fully static site to ./out.
  output: "export",
  // Pages resolves /about as /about/index.html, so emit directories.
  trailingSlash: true,
};

const withContent = await createContent();

export default withContent(nextConfig);
