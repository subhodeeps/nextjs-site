// prettier.config.mjs
//
// Settings for Prettier, which lays out the code consistently: indentation, line
// breaks, quotes and so on. Run it with `npm run format` after editing; it never
// changes what the code does. These settings follow the style that most of the
// code already used. Markdown and MDX files are left alone (see .prettierignore).

/** @type {import('prettier').Config} */
const config = {
    // Four spaces per level of indentation
    tabWidth: 4,
    // No semicolons at the ends of statements
    semi: false,
    // 'Single quotes' for strings in TypeScript; JSX attributes keep "double quotes"
    singleQuote: true,
    // Lines longer than this are broken up
    printWidth: 100,
    overrides: [
        // JSON files (package.json, tsconfig.json) keep the two-space indentation npm uses
        { files: ['*.json'], options: { tabWidth: 2 } },
    ],
}

export default config
