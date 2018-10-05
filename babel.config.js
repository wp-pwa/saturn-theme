module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['android >= 5', 'ios_saf > 9', 'and_chr >= 40'],
        },
      },
    ],
    '@babel/react',
  ],
  plugins: ['@babel/proposal-class-properties'],
};
