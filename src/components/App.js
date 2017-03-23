import React from 'react';
import ImageExperiments from './ImageExperiments';

import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <main className="app">
        <h1>Webpack</h1>
        <ImageExperiments />
      </main>
    );
  }
}
