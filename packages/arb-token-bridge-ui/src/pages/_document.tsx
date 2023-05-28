import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <link rel="icon" href="/logo.png?v=1" />

        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Built to scale Ethereum, EcoBlock brings you 10x lower costs while inheriting Ethereum’s security model. EcoBlock is a Layer 2 Optimistic Rollup."
        />

        {/* Fathom Analytics */}
        <script
          src="https://cdn.usefathom.com/script.js"
          data-site="SKOIAJUL"
          defer
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
