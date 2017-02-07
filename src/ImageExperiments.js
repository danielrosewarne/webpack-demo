import React, { Component } from 'react';

import Icon from './Icon.js';

import './ImageExperiments.scss';

export default class ImageExperiments extends Component {
  render() {
    return(
      <main className="image-experiments">
        <div className="pic1">I am a picture</div>
        <div className="pic2">I am a picture as well</div>
        <div className="svg1">I am an SVG background</div>
        <div className="svg2">I am an SVG inline <Icon type="play" /></div>
        <div className="svg2">I am an SVG inline <Icon type="file" /></div>
        <div className="svg2">I am an SVG inline <Icon type="tick" /></div>
        <div className="svg2">I am an SVG inline <Icon type="book" /></div>
      </main>
    );
  } 
}
