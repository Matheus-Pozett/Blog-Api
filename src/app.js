require('express-async-errors');
const express = require('express');
const { UserRouter, CategoryRouter, PostRouter } = require('./routes');
const { errorMiddleware } = require('./middleware');
const { specs, swaggerUi } = require('./swagger');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(UserRouter);
app.use(CategoryRouter);
app.use(PostRouter);
app.use(errorMiddleware);

module.exports = app;
