// postcss.config.mjs
//
// PostCSS processes the CSS when the site is built. Its only job here is to run
// Tailwind, which turns the utility classes written in className="..." into real
// CSS rules (see tailwind.config.ts and docs/for-jekyll-users.md).

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
