import express from 'express';
import compression from 'compression';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import jsonfile from 'jsonfile';

import { renderMarkup } from './utils/server';
import App from './components/App';

const app = express();

const getAssetPaths = () => {
  const file = `${process.cwd()}/dist/assets-manifest.json`
  return jsonfile.readFileSync(file)["client"];
}

if (process.env.NODE_ENV !== 'development') {
  app.enable('trust proxy');
}

const cacheLengthms = 31556952000;

app.use(express.static('dist/client', {
  etag: true,
  maxAge: cacheLengthms.toString(),
  setHeaders: (res) => {
    res.setHeader('Expires', new Date(Date.now() + cacheLengthms).toUTCString());
  }
}));

app.get('/', function (req, res) {
  let html = renderToString(<App />);
  let markup = renderMarkup(html, getAssetPaths());

  res.status(200).send(markup)
});

app.listen(process.env.PORT || 8081);
