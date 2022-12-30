const path = require("path");

// https://nextjs.org/docs/basic-features/eslint#lint-staged
const buildEslintCommand = (filenames) => {
  return `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;
};

module.exports = {
  "*.{js,jsx,ts,tsx}": ["npm run format", buildEslintCommand],
};
