const { name } = require('./package')

module.exports = {
    ...require('../../jest.base.config'),
    name,
    displayName: name,
    setupFilesAfterEnv: [
        './jest.setup.ts',
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/__tests__/utilities/',
    ],
}