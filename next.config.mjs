/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "192.168.1.203",
    "http://192.168.1.203",
    "http://192.168.1.203:3000",
  ],
};

export default nextConfig;
