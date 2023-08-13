const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({  
experimental: {
  swcPlugins: [["next-superjson-plugin", {}]],
},
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
})
