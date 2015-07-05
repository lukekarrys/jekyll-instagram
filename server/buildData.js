'use strict';

import keys from 'lodash/object/keys';
import sortBy from 'lodash/collection/sortBy';
import readData from './readData';
import {dateParts} from '../src/helpers/permalink';

const sortByTag = (tag) => tag.toLowerCase();
const sortByIndex = (num) => parseInt(num, 10);

class KeySets {
  constructor (options = {}) {
    this.options = options;
    this._values = {};
  }

  add (key, id) {
    if (this._values[key] === undefined) {
      this._values[key] = [];
    }
    this._values[key].push(id);
  }

  getValues () {
    return this._values;
  }
}

class ByTag extends KeySets {
  constructor () {
    super();
  }

  add (tag, id) {
    if (tag.indexOf('#') === 0) {
      tag = tag.slice(1);
    }
    super.add(tag, id);
  }

  addTags (tags, id) {
    tags.forEach((tag) => this.add(tag, id));
  }
}

class ByDate extends KeySets {
  constructor () {
    super();
  }

  add (time, id) {
    const {day, month, year} = dateParts(time);
    super.add(`${year}/${month}/${day}`, id);
    super.add(`${year}/${month}`, id);
    super.add(`${year}`, id);
  }
}

class ByPage extends KeySets {
  constructor (options) {
    super(options);
  }

  add (index, id) {
    const page = Math.floor(index / this.options.pagination);
    super.add(page + 1, id);
  }
}

const buildData = (dir, cb) => {
  const byTag = new ByTag();
  const byDate = new ByDate();
  const byPage = new ByPage({pagination: 10});
  const byId = {};
  readData(dir, (err, data) => {
    if (err) return cb(err);
    data.forEach((datum, index) => {
      const {filter, tags, created_time, id} = datum;
      byTag.addTags(tags, id);
      byTag.add(filter || 'Normal', id);
      byDate.add(created_time, id);
      byPage.add(index, id);
      byId[id] = datum;
    });
    cb(null, {
      ids: byId,
      tags: byTag.getValues(),
      tagKeys: sortBy(keys(byTag.getValues()), sortByTag),
      dates: byDate.getValues(),
      pages: byPage.getValues(),
      pageKeys: sortBy(keys(byPage.getValues()), sortByIndex)
    });
  });
};

export default buildData;