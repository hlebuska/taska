/** @type {import('next').NextConfig} */
import { fileURLToPath } from "url";
import path from "path";

// ES Modules equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
