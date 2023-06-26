// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin')

// @ts-check type next.config.js

/**
 * @type {import('next').NextConfig}
 **/

module.exports = nextTranslate({
  distDir: 'build',
  productionBrowserSourceMaps: true,
  reactStrictMode: true
})
