module.exports = {
  name: 'five-e',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/five-e/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
