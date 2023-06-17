module.exports = {
  verbose: true,
  resetMocks: true,
  "collectCoverage": true,
  "collectCoverageFrom": [
    "./src/**"
  ],
  "coverageThreshold": {
    "global": {
      "lines": 80
    }
  }
};