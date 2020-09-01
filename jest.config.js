module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  globals: {
    'ts-jest': {
      isolatedModules: true
    },
  },
};