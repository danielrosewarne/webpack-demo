import React, { Component } from 'react';

import Icon from './Icon.js';

import './ImageExperiments.scss';

export default class ImageExperiments extends Component {
  render() {
    return(
      <main className="image-experiments">
        <div className="pic1">I am an image within CSS</div>
        <div className="pic2">I am an image with a hashed filename</div>
        <div className="svg1">I am an SVG background</div>
        <div className="svg2">
          These are inline SVGs<br />
          <Icon type="play" /><br />
          <Icon type="file" /><br />
          <Icon type="tick" /><br />
          <Icon type="book" />
        </div>
      </main>
    );
  } 
}
