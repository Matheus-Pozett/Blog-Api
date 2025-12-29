const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const CategoryModel = require('../../../src/models/Category');

chai.use(sinonChai);

describe('Testes de Unidade: Model de Category', function () {
  const Category = CategoryModel(sequelize, dataTypes);
  const category = new Category();
  describe('Nome da model', function () {
    checkModelName(Category)('Category')
  })

  describe('Propriedades', function () {
    const properties = ['name'];

    properties.forEach(checkPropertyExists(category))
  })
})