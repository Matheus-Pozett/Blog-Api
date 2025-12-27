const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const BlogPostModel = require('../../../src/models/BlogPost');

chai.use(sinonChai);

describe('Testes de Unidade: Model de BlogPost', function () {
  const BlogPost = BlogPostModel(sequelize, dataTypes);
  const blogPost = new BlogPost();

  describe('Nome da model', function () {
    checkModelName(BlogPost)('BlogPost')
  })

  describe('Propriedades', function () {
    const properties = ['title', 'content', 'userId', 'published', 'updated'];

    properties.forEach(checkPropertyExists(blogPost));
  })

  describe('Associações', function () {
    const User = {
      tableName: 'users'
    }

    before(() => {
      //associate passando mock
      BlogPost.associate({ User });
    });

    it('Deve ter uma associação belongsTo com User', function () {
      expect(BlogPost.belongsTo).to.have.been.calledWith(User, {
      foreignKey: 'userId', as: 'user'
    })
    })
  })
})