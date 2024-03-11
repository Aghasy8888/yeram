/** @type {import('next').NextConfig} */
const path = require("path");
const withDotenv = require('dotenv-webpack');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config) => {
    config.plugins.push(new withDotenv());
    return config;
  },
};

module.exports = nextConfig;
