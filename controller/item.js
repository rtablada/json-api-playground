const BaseController = require('./base');

class ItemController extends BaseController {
  get type() {
    return 'item';
  }

  get table() {
    return 'items';
  }

  get attributes() {
    return ['name'];
  }

  get relations() {
    return {
      list: this.belongsTo('list', 'lists', 'list_id'),
    };
  }
}

module.exports = ItemController;
