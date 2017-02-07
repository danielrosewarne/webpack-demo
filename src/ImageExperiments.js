import React, { Component } from 'react'

import IconSprite from '../assets/svg/icons.svg'

import './ImageExperiments.scss';

export default class ImageExperiments extends Component {
  render() {
    return(
      <main className="image-experiments">
        <div className="pic1">I am a picture</div>
        <div className="pic2">I am a picture as well</div>
        <div className="svg1">I am an SVG background</div>
        <div className="svg2">I am an SVG inline <svg><use xlinkHref="{IconSprite}#play" /></svg></div>
      </main>
    );
  }
}
