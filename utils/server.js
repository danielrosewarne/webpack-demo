export function renderMarkup(html, assetPaths) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>SSR Webpack Demo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" type="text/css" href="${assetPaths["css"]}" />
  </head>
  <body>
    <div id="app">${html}</div>
    <script type="text/javascript" src="${assetPaths["js"]}"></script>
  </body>
</html>`;
}
