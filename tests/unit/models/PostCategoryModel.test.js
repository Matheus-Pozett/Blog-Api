const chai = require('chai');
const sinon = require('sinon')
const sinonChai = require('sinon-chai');
const { expect } = chai;
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const PostCategoryModel = require('../../../src/models/PostCategory');

chai.use(sinonChai);

describe('Testes de Unidade: Model de PostCategory', function() {
  const PostCategory = PostCategoryModel(sequelize, dataTypes);
  const postCategory = new PostCategory;

  describe('Nome da model', function () {
    checkModelName(PostCategory)('PostCategory')
  });

  describe('Propriedades', function () {
    const properties = ['postId', 'categoryId'];

    properties.forEach(checkPropertyExists(postCategory));
  });

  describe('Associações', function() {
    const Category = {
      belongsToMany: sinon.spy(),
    };

    const BlogPost = {
      belongsToMany: sinon.spy(),
    };

    before(() => {
      PostCategory.associate({ Category, BlogPost });
    });

    it('models.Category deve fazer belongsToMany com models.BlogPost', function() {
      expect(Category.belongsToMany).to.have.been.calledWith(BlogPost, {
        as: 'blog_posts',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    });

    it('models.BlogPost deve fazer belongsToMany com models.Category', function() {
      expect(BlogPost.belongsToMany).to.have.been.calledWith(Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
    });
  });
})