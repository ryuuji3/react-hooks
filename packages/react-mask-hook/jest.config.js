const { name } = require('./package')

module.exports = {
    ...require('../../jest.base.config'),
    name,
    displayName: name,
    setupFilesAfterEnv: [
        './jest.setup.ts',
    ],
}