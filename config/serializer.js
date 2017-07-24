const JSONAPISerializer = require('json-api-serializer');
const Serializer = new JSONAPISerializer({
  id: 'id',
  convertCase: 'kebab-case',
  unconvertCase: 'camelCase',
});

Serializer.register('list', {
  whitelist: ['name', 'created_at'],
  links: {
    self(data) {
      return `/lists/${data.id}`;
    },
  },
  topLevelLinks: {
    self: '/lists',
  },

  relationships: {
    items: {
      type: 'item',
      links({ id }) {
        return {
          self: `/lists/${id}/relationships/items`,
          related: `/lists/${id}/items`,
        };
      },
    },
  },
});

Serializer.register('item', {
  whitelist: ['name', 'created_by', 'completed_at', 'created_at'],
  links: {
    self(data) {
      return `/items/${data.id}`;
    },
  },
  topLevelLinks: {
    self: '/items',
  },

  relationships: {
    list: {
      type: 'list',
      links({ id }) {
        return {
          self: `/items/${id}/relationships/list`,
          related: `/items/${id}/list`,
        };
      },
    },
  },
});

module.exports = Serializer;
