// eslint-disable-next-line import/no-extraneous-dependencies
import nextTranslate from 'next-translate-plugin'

// @ts-check type next.config.js

/**
 * @type {import('next').NextConfig}
 **/

export default nextTranslate({
  distDir: 'build',
  productionBrowserSourceMaps: true,
  reactStrictMode: true
})
