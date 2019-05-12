module.exports = {
  name: 'four-e',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/four-e/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
