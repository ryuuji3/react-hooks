module.exports = {
    ...require('./jest.base.config'),
    projects: [
      '<rootDir>/packages/*/jest.config.js'
    ]
};