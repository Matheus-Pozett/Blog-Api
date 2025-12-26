require('express-async-errors');
const express = require('express');
const { UserRouter, CategoryRouter, PostRouter } = require('./routes');
const { errorMiddleware } = require('./middleware');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(UserRouter);
app.use(CategoryRouter);
app.use(PostRouter);
app.use(errorMiddleware);

module.exports = app;
