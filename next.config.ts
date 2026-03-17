import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n.ts' // This is the path to your i18n configuration file
);

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
