const Serializer = require('../config/serializer');
const errors = require('../helpers/errors');
const _ = require('lodash');

class BaseController {
  constructor() {
    this.knex = require('../config/knex');
  }

  get model() {
    return this.knex.table(this.table);
  }

  get relations() {
    return {};
  }

  belongsTo(childType, childTable, foreignKey) {
    return {
      fetch: (parentModel) => {
        const whereClause = { id: parentModel[foreignKey] };

        return this.knex
          .table(childTable)
          .where(whereClause)
          .first();
      },
      type: childType,
    };
  }

  hasMany(childType, childTable, foreignKey) {
    return {
      fetch: ({ id }) => {
        const whereClause = {};
        whereClause[foreignKey] = id;

        return this.knex
          .table(childTable)
          .where(whereClause);
      },
      type: childType,
    };
  }

  sendSerialize(res, type, data) {
    return res.send(Serializer.serialize(type, data));
  }

  send(res, data) {
    return this.sendSerialize(res, this.type, data);
  }

  error(res, type, ...args) {
    return res.send(errors[type](...args));
  }

  getAttributes(req) {
    return _.pick(req.body.data.attributes, this.attributes);
  }

  async index(req, res) {
    const lists = await this.model.select();

    return this.send(res, lists);
  }

  async show(req, res) {
    const id = req.params.id;

    const list = await this.model
      .where({ id })
      .first();

    if (list) {
      return this.send(res, list);
    }

    this.error(res, 'notFound', this.type);
  }

  async store(req, res) {
    const reqAttrs = this.getAttributes(req);
    const timestamps = { created_at: new Date(), updated_at: new Date() };

    const list = await this.model
      .insert(Object.assign({}, timestamps, reqAttrs), '*');

    this.send(res, list);
  }

  async update(req, res) {
    const id = req.params.id;

    const list = await this.model
      .where({ id })
      .first();

    if (!list) {
      return this.error(res, 'notFound', this.type);
    }

    const reqAttrs = this.getAttributes(req);
    const timestamps = { updated_at: new Date() };

    const updatedList = await this.model
      .where({ id })
      .limit(1)
      .update(Object.assign({}, timestamps, reqAttrs), '*');

    this.send(res, updatedList[0]);
  }

  async destroy(req, res) {
    const id = req.params.id;

    const list = await this.model
      .where({ id })
      .limit(1)
      .del();

    if (!list) {
      return this.error(res, 'notFound', this.type);
    }

    res.status(204).send();
  }

  async relation(req, res) {
    const relationName = req.params.relationName;
    const relation = this.relations[relationName];

    if (!relation) {
      return this.error(res, 'noRelation', this.type, relationName);
    }

    const id = req.params.id;

    const parentModel = await this.model
      .where({ id })
      .first();

    if (!parentModel) {
      return this.error(res, 'notFound', this.type);
    }

    const relatedModels = await relation.fetch(parentModel);

    this.sendSerialize(res, relation.type, relatedModels);
  }
}

module.exports = BaseController;
