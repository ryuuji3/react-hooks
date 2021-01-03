/* eslint-disable */

module.exports = {
    filter: '.',
    indent: '    ', // 4 spaces
    dev: true,
    peer: true,
    prod: true,
    semverRange: '^', // allow up to minor release version differences
    sortAz: [ 'dependencies', 'devDependencies', 'peerDependencies' ],
    sortFirst: [
        'name',
        'version',
        'private',
        'description',
        'author',
        'license',
        'keywords',
        'repository',
        'bugs',
        'scripts',
        'dependencies',
        'devDependencies',
        'peerDependencies',
    ],
    source: ['package.json', 'packages/**!(node_modules)/package.json'],
    versionGroups: [],
}