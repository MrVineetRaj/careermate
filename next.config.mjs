/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack(config, options) {
    // Exclude `chrome-aws-lambda` from being processed by Webpack
    config.externals = config.externals || [];
    config.externals.push('chrome-aws-lambda');

    // Handle `puppeteer-core` module
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules\/(?!puppeteer-core)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    });

    // Add any other custom Webpack configuration here if needed

    return config;
  },
};

export default nextConfig;
