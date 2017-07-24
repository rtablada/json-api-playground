const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const ListController = require('./controller/list');
const ItemController = require('./controller/item');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json({}));
app.use(cors());

const resource = (name, Controller) => {
  const controller = new Controller();

  app.get(`/${name}`, (req, res) => controller.index(req, res));
  app.get(`/${name}/:id`, (req, res) => controller.show(req, res));
  app.post(`/${name}`, (req, res) => controller.store(req, res));
  app.put(`/${name}/:id`, (req, res) => controller.update(req, res));
  app.patch(`/${name}/:id`, (req, res) => controller.update(req, res));
  app.delete(`/${name}/:id`, (req, res) => controller.destroy(req, res));

  // Relations
  app.get(`/${name}/:id/:relationName`, (req, res) => controller.relation(req, res));
};

resource('lists', ListController);
resource('items', ItemController);


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
