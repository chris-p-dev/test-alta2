module.exports = {
  ...require('./tests/config/jest.common.js'),

  projects: [
    //'./tests/config/jest.lint.js',
    // './tests/config/jest.prettier.js',
    './tests/config/jest.store.js',
    // './tests/config/jest.ui.js',
  ],

  collectCoverage: true,

  coverageThreshold: {
    // global: {
    //   statements: 85,
    //   branches: 75,
    //   functions: 85,
    //   lines: 85,
    // },

    // 'source/components/': {
    //   statements: 50,
    //   branches: 50,
    //   functions: 50,
    //   lines: 50,
    // },

    'src/store/': {
      statements: 85,
      branches: 75,
      functions: 85,
      lines: 85,
    },
  },
};
