// Jest configuration file
export default {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // just the components folder
  collectCoverageFrom: [
    "src/components/**/*.{js,jsx,ts,tsx}",
    "src/pages/**/*.{js,jsx,ts,tsx}",
    "src/utils/**/*.{js,jsx,ts,tsx}",
    "src/modals/**/*.{js,jsx,ts,tsx}",
  ],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  collectCoverage: true,
  coverageDirectory: "coverage",

  // A list of paths to directories that Jest should use to search for files in
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  // A preset that is used as a base for Jest's configuration
  testEnvironment: "jsdom",

  // The glob patterns Jest uses to detect test files
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
