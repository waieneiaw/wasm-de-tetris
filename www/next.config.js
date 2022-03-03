/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.experiments = {
      asyncWebAssembly: true,
    };
    config.output.webassemblyModuleFilename =
      (isServer ? '../' : '') + 'static/wasm/webassembly.wasm';

    return config;
  },
};

module.exports = nextConfig;
