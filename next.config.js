module.exports = {
  images: {
    domains: ["assets.acme.com"],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      process: false,
      buffer: false,
    };

    return config;
  },
};
