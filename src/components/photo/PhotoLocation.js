'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'rebass';

export default class PhotoLocation extends Component {
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

    return [
      geo && <Badge key='geo' ml={0} mr={0}>{geo}</Badge>,
      ' ',
      name && <Badge key='name' ml={0} mr={0}>{name}</Badge>
    ];
  }
}
