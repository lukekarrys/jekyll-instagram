'use strict';

import alt from '../alt';
import api from '../helpers/api';

class TagsActions {
  constructor () {
    this.generateActions('load', 'error', 'success');
  }

  fetch (path) {
    api(this, path);
  }
}

export default alt.createActions(TagsActions);
