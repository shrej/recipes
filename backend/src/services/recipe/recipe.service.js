// Initializes the `recipe` service on path `/recipe`
const createService = require('feathers-mongoose');
const createModel = require('../../models/recipe.model');
const hooks = require('./recipe.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/recipe', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('recipe');

  service.hooks(hooks);
};
