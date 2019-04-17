// TODO: Update all test to use babel-jest
module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$': require.resolve(
      './__mocks__/fileMock.js'
    ),
    '\\.(css|less|scss)$': require.resolve('./__mocks__/styleMock.js'),
  },
  coverageReporters: ['json', 'lcovonly', 'text', 'html'],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
};
