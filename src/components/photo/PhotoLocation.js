'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'rebass';

export default class PhotoComments extends Component {
  static propTypes = {
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    name: PropTypes.string
  };

  getGeo() {
    const {latitude, longitude} = this.props;
    return latitude && longitude ? `${latitude}, ${longitude}` : '';
  }

  getName() {
    const {name} = this.props;
    return name || '';
  }

  render() {
    const name = this.getGeo();
    const geo = this.getName();

    if (!name && !geo) return null;

    return (
      <span>
        {geo && <Badge ml={0} mr={0}>{geo}</Badge>}
        {' '}
        {name && <Badge ml={0} mr={0}>{name}</Badge>}
      </span>
    );
  }
}
