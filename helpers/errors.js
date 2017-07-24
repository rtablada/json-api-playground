module.exports = {
  notFound: resourceName => ({
    errors: [{
      status: 404,
      title: 'Resource not found',
      message: `The specificed ${resourceName} could not be found`,
    }],
  }),

  noRelation: (resourceName, relationName) => ({
    errors: [{
      status: 400,
      title: 'Relation not found',
      message: `The "${relationName}" relationship does not exist on the ${resourceName} resource`,
    }],
  }),
};
