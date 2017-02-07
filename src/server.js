import express from 'express';
import compression from 'compression';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import jsonfile from 'jsonfile';

import { renderMarkup } from '../utils/server';
import App from './App';

const app = express();

if (process.env.NODE_ENV !== 'development') {
  app.enable('trust proxy');
}

app.use(express.static('static'));

app.get('/', function (req, res) {
  function getAssetPaths() {
    const file = `${process.cwd()}/build/webpack-assets.json`
    const assetPaths = jsonfile.readFileSync(file)["main"];
    return assetPaths;
  }

  let html = renderToString(<App />);
  let markup = renderMarkup(html, getAssetPaths());

  res.status(200).send(markup)
});

app.listen(process.env.PORT || 8081);
