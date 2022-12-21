const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('../infrastructure/model')
const routes = require('./routes');


const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

routes.init(app);

module.exports = app;
