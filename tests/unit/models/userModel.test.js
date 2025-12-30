const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const UserModel = require('../../../src/models/User');

chai.use(sinonChai);

describe('Testes de Unidade: Model de User', function () {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('Nome da Model', () => {
    checkModelName(User)('User');
  });

  describe('Propriedades', () => {
    // Lista de colunas que esperamos que existam
    const properties = ['displayName', 'email', 'password', 'image'];

    // O checkPropertyExists gera um teste (it) para cada item do array
    properties.forEach(checkPropertyExists(user));
  });

  describe('Associações', () => {
    // Mockamos o model que será associado
    const BlogPost = {
      tableName: 'blog_posts', // Apenas um objeto simples para representar o model
    };

    beforeEach(() => {
      //associate passando mock
      User.associate({ BlogPost });
    });

    it('deve ter uma associação hasMany com BlogPost', () => {
      expect(User.hasMany).to.have.been.calledWith(BlogPost, {
        foreignKey: 'userId',
        as: 'blog_posts',
      });
    });
  });
})