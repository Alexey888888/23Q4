const config = {
  tabWidth: 2,
  printWidth: 120,
  singleQuote: false,
  overrides: [
    {
      files: ["main.js", "abc.js", ".eslintrc.js", "abcArr.js", "questionsArr.js"],
      options: {
        singleQuote: true,
      },
    },
  ],
};

module.exports = config;
