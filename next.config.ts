import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* @ts-ignore - allowedDevOrigins is required for cross-device dev but may not be in types yet */
  allowedDevOrigins: ["192.168.1.6", "localhost:3000"]
};

export default nextConfig;
