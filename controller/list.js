const BaseController = require('./base');

class ListController extends BaseController {
  get type() {
    return 'list';
  }

  get table() {
    return 'lists';
  }

  get attributes() {
    return ['name'];
  }

  get relations() {
    return {
      items: this.hasMany('item', 'items', 'list_id'),
    };
  }
}

module.exports = ListController;
