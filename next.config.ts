import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // On Vercel (and any CI) use the default .next output directory.
  // Locally, redirect compiled output to /tmp to avoid FUSE-mounted NTFS
  // filesystem latency (high-frequency small writes cause 400ms+ benchmark
  // warnings and sluggish HMR on the mounted partition).
  ...(!process.env.VERCEL && { distDir: "/tmp/wellness-group-next" }),
};

export default nextConfig;
