module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.jsx'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};