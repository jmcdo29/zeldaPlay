module.exports = {
  name: 'tabletop-companion',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/tabletop-companion/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
