// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="sv">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>Gröna Linjen Bryggeri</title>
          <meta
            name="description"
            content="Ett bryggeri längs den gröna linjen med en bryggprocess som inte går som på räls"
          />

          <meta property="og:title" content="Gröna Linjen Bryggeri" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/meta/meta_card.png" />
          <meta property="og:url" content="https://gronalinjenbryggeri.se" />
          <meta name="twitter:card" content="summary_large_image" />

          <meta
            property="og:description"
            content="Ett bryggeri längs den gröna linjen med en bryggprocess som inte går som på räls"
          />
          <meta property="og:site_name" content="Gröna Linjen Bryggeri" />
          <meta name="twitter:image:alt" content="Gröna Linjen lines logo" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/meta/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/meta/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/meta/favicon-16x16.png"
          />
          <link rel="manifest" href="/meta/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/meta/safari-pinned-tab.svg"
            color="#00f148"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#05050F" />

          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
