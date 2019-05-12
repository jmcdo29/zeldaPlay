module.exports = {
  name: 'zeldaplay',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/zeldaplay/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
