const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const CompressionPlugin = require('compression-webpack-plugin');

const localeSubpaths = {
  // enable site.com/fr/..
  // en: 'en',
  // fr: 'fr',
};

const execSync = require('child_process').execSync;
const gitBranch = execSync('git rev-parse --abbrev-ref HEAD');
const sha = execSync('git rev-parse --short HEAD');
const gitCommitHash = sha.toString().replace('\n', '');
const gitVersion = require('./package.json').version;
const date = new Date();
const month = date.toLocaleString('default', { month: 'long' });
const today = date.getDate();
const currentYear = date.getFullYear();
const currentTime = date.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
  timeZoneName: 'short',
  timeZone: 'America/Los_Angeles',
});
const timeStamp = month + ' ' + today + ', ' + currentYear + ' ' + currentTime;

const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    AVB_UI_VERSION: '7.12.1',
    AVB_UI_CUSTOM_SRI:
      'sha384-VQwia5Vtbf9w2G2N2dmv2FTmdLcfffDZYXnnrM5EgQW9zWjlfB6pn6rORvZCoFce',
    AVB_UI_STYLES_SRI:
      'sha384-D8Th0C/nM5jJt/MCd2QZ6NtGQ4BQ/ubNJ2WWFqQ7AyMhOKxDWDyYWIbwgqQfcnnB',
    ENABLE_REACT_AXE: process.env.ENABLE_REACT_AXE,
    DISABLE_CHARGEAFTER_SCRIPT:
      process.env.DISABLE_CHARGEAFTER_SCRIPT === 'true',
    GIT_VERSION: gitVersion,
    GIT_SHA: process.env.APP_ENV === 'production' ? '' : gitCommitHash,
    GIT_BRANCH:
      process.env.APP_ENV === 'production'
        ? ''
        : gitBranch.toString().replace('\n', ''),
    LAST_BUILD: process.env.APP_ENV === 'production' ? '' : timeStamp,
    ALTA_DEBUG: process.env.ALTA_DEBUG && process.env.APP_ENV !== 'production',
    // !! If later environments are added, make sure ENABLE_BROTLI env var is also available - see ALTA-2781
    ENABLE_BROTLI: process.env.ENABLE_BROTLI === 'true',
    ENABLE_VIDEOLY_PREVIEW: process.env.ENABLE_VIDEOLY_PREVIEW === 'true',
  },

  generateBuildId: async () => {
    return gitVersion;
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  i18n: {
    locales: ['en', 'fr', 'en-US', 'en-CA', 'fr-CA'],
    defaultLocale: 'en-US',
    localeDetection: false,
  },

  publicRuntimeConfig: {
    localeSubpaths,
  },

  webpack: (config) => {
    config.plugins = [
      ...config.plugins,
      ...(process.env.ENABLE_BROTLI === 'true'
        ? [
            new CompressionPlugin({
              filename: '[file].br',
              algorithm: 'brotliCompress',
              test: /\.(js|css)$/,
              deleteOriginalAssets: false,
            }),
          ]
        : []),
    ];
    return config;
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/catalog/product/view/id/:productId*',
        destination: '/product/:productId*',
        permanent: true,
      },
      {
        source: '/customer/account',
        destination: '/',
        permanent: true,
      },
      {
        source: '/promos',
        destination: '/promotions',
        permanent: true,
      },
      {
        source: '/checkout/onepage/success:info*',
        destination: '/checkout/success:info*',
        permanent: true,
      },
    ];
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config

    // to allow for better refresh with docker
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },

  // TODO:
  // There is an issue on NextJs where font optimization does not seem to work
  // as it is stated in the docs.  Not sure what the issue so we need to revisit
  // this later once they actually fix it.
  optimizeFonts: false,
};

module.exports = withBundleAnalyzer(nextConfig);
