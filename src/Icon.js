import React, { Component } from 'react';

import './Icon.scss';

export default class Icon extends Component {
  constructor(props) {
    super(props);
    const IconSprite = require('../assets/svg/icons.svg');
    this.state = {
      iconSprite: IconSprite
    };
  }

  render() {
    return(
      <svg className="svg-icon"><use xlinkHref={`${this.state.iconSprite}#${this.props.type}`} /></svg>
    );
  }
}
