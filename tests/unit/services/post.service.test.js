const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { Category, BlogPost, PostCategory, sequelize, User } = require('../../../src/models');
const PostError = require('../../../src/Errors/PostError');
const CategoryError = require('../../../src/Errors/CategoryError');
const { PostService } = require('../../../src/service');
const {mockNewPost, mockAllPosts, mockPostId, mockUpdatedPost} = require('../mocks/postMock');
const { Op } = require('sequelize');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes de unidade: PostService', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Função createPost', async function() {
    it('Lança erro 400 se uma ou mais categoryIds não existirem', async function() {
      const postData = {
        title: "Post Teste",
        content: "Conteudo",
        categoryIds: [1, 999]
      };
      const userId = 1;

      sinon.stub(Category, 'findAndCountAll').resolves({ count: 1 });

      try {
        await PostService.createPost(postData, userId);
        throw new Error('Deveria ter lançado erro de categoria');
      } catch (error) {
        expect(error).to.be.instanceOf(CategoryError);
        expect(error.status).to.be.equal(400);
        expect(error.message).to.be.equal('one or more "categoryIds" not found');
      }
    });

    it('Cria um post com sucesso usando Transação', async function () {
      const postData = {
        title: "Post Sucesso",
        content: "Conteudo Top",
        categoryIds: [1, 2]
      };
      const userId = 10;

      const t = {
        commit: sinon.stub().resolves(),
        rollback: sinon.stub().resolves()
      };

      sinon.stub(sequelize, 'transaction').resolves(t);
      sinon.stub(Category, 'findAndCountAll').resolves({ count: 2 });
      sinon.stub(BlogPost, 'create').resolves(mockNewPost);
      sinon.stub(PostCategory, 'bulkCreate').resolves();

      const result = await PostService.createPost(postData, userId);

      expect(result).to.be.deep.equal(mockNewPost);
      expect(BlogPost.create).to.have.been.calledWith(
        { title: postData.title, content: postData.content, userId },
        { transaction: t }
      );
      expect(PostCategory.bulkCreate).to.have.been.calledWith(
        [
          { postId: 8, categoryId: 1 },
          { postId: 8, categoryId: 2 }
        ],
        { transaction: t }
      );
      expect(t.commit).to.have.been.called;
    });

    it('Faz rollback na transação caso ocorra erro ao associar categorias', async function () {
      const postData = {
        title: "Post Falha",
        content: "Vai dar ruim",
        categoryIds: [1, 2]
      };
      const userId = 10;

      const t = {
        commit: sinon.stub().resolves(),
        rollback: sinon.stub().resolves()
      };

      sinon.stub(sequelize, 'transaction').resolves(t);
      sinon.stub(Category, 'findAndCountAll').resolves({ count: 2 });
      sinon.stub(BlogPost, 'create').resolves(mockNewPost);

      sinon.stub(PostCategory, 'bulkCreate').rejects(new Error('Erro de conexão no banco'));

      try {
        await PostService.createPost(postData, userId);
        throw new Error('Deveria ter lançado erro');
      } catch (error) {
        expect(error.message).to.be.equal('Erro de conexão no banco');
        expect(t.rollback).to.have.been.called;
        expect(t.commit).not.to.have.been.called;
      }
    });
  });

  describe('Função getAllPosts', function () {
    it('Lista todos os posts', async function () {
      sinon.stub(BlogPost, 'findAll').resolves(mockAllPosts);

      const result = await PostService.getAllPosts();
      
      expect(result).to.be.deep.equal(mockAllPosts);
      expect(BlogPost.findAll).to.have.been.calledWith({
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
    });
  });

  describe('Função getPostById', function() {
    it('Lista posts por ID', async function() {
      const id = 3;
      sinon.stub(BlogPost, 'findByPk').resolves(mockPostId);

      const result = await PostService.getPostById(id);

      expect(result).to.be.deep.equal(mockPostId);
      expect(BlogPost.findByPk).to.have.been.calledWith(3, {
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
    });

    it('Lança Erro "Post does not exist" caso não encontre pelo ID', async function() {
      const id = 99;
      sinon.stub(BlogPost, 'findByPk').resolves(null);

      try {
        await PostService.getPostById(id);
        throw new Error("Deveria dar erro acima");
      } catch (error) {
        expect(error).to.be.instanceOf(PostError);
        expect(error.status).to.be.eq(404);
        expect(error.message).to.be.eq('Post does not exist');
      }
    });
  });

  describe('Função updatePost', function () {
    it('Não atualiza post se o Id não for encontrado', async function () {
      const id = 1;
      const userId = { id: 1 };
      const postData = {
        title: "Latest updates, August 1st",
        content: "The whole text for the blog post goes here in this key"
      }

      sinon.stub(BlogPost, 'findByPk').resolves(null);

      try {
        await PostService.updatePost(id, userId, postData);
        throw new Error("Deveria dar erro acima");
      } catch (error) {
        expect(error).to.be.instanceOf(PostError);
        expect(error.status).to.be.eq(404);
        expect(error.message).to.be.eq('Post does not exist');
      }
    });

    it('Se o usuário não tiver autorização para atualizar lança erro', async function () {
      const id = 3;
      const userId = { id: 999 };
      const postData = {
        title: "Latest updates, August 1st",
        content: "The whole text for the blog post goes here in this key"
      }

      sinon.stub(BlogPost, 'findByPk').resolves(mockPostId);

      try {
        await PostService.updatePost(id, userId, postData);
      } catch (error) {
        expect(error).to.be.instanceOf(PostError);
        expect(error.status).to.be.eq(401);
        expect(error.message).to.be.eq('Unauthorized user');
      }
    })

    it('Atualiza post com sucesso se o usuário for o dono', async function() {
      const id = 3;
      const userId = { id: 2 };
      const postData = {
        title: "Latest updates, August 1st",
        content: "The whole text for the blog post goes here in this key"
      }

      const findByPkStub = sinon.stub(BlogPost, 'findByPk');
      findByPkStub.onFirstCall().resolves(mockPostId);
      findByPkStub.onSecondCall().resolves(mockUpdatedPost);

      sinon.stub(BlogPost, 'update').resolves([1]);

      const result = await PostService.updatePost(id, userId, postData);
      
      expect(result).to.be.deep.equal(mockUpdatedPost);
      expect(BlogPost.update).to.have.been.calledWith(
        { title: postData.title, content: postData.content },
        { where: { id } }
      );
    });
  });

  describe('Função deletePost', function () {
    it('Lança erro 404 se o post não existir', async function () {
      sinon.stub(BlogPost, 'findByPk').resolves(null);
      try {
        await PostService.deletePost(1, { id: 1 });
        throw new Error("Deveria falhar");
      } catch (error) {
        expect(error.status).to.be.equal(404);
        expect(error.message).to.be.equal('Post does not exist');
      }
    });

    it('Lança erro 401 se o usuário não for o dono', async function () {
      const mockPost = { id: 1, userId: 5 };
      const userTryingToDelete = { id: 99 };

      sinon.stub(BlogPost, 'findByPk').resolves(mockPost);

      try {
        await PostService.deletePost(1, userTryingToDelete);
        throw new Error("Deveria falhar");
      } catch (error) {
        expect(error.status).to.be.equal(401);
        expect(error.message).to.be.equal('Unauthorized user');
      }
    });

    it('Deleta o post com sucesso se o usuário for o dono', async function () {
      const mockPost = { id: 1, userId: 5 };
      const userOwner = { id: 5 };

      sinon.stub(BlogPost, 'findByPk').resolves(mockPost);
      sinon.stub(BlogPost, 'destroy').resolves();

      await PostService.deletePost(1, userOwner);

      expect(BlogPost.destroy).to.have.been.calledWith({ where: { id: 1 } });
    });
  });

  describe('Função searchPostByTerm', function () {
    it('Retorna posts que correspondem ao termo de busca', async function () {
      const searchTerm = "post";
      
      sinon.stub(BlogPost, 'findAll').resolves(mockAllPosts);

      const result = await PostService.searchPostByTerm(searchTerm);

      expect(result).to.be.deep.equal(mockAllPosts);

      expect(BlogPost.findAll).to.have.been.calledWith({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${searchTerm}%` } },
            { content: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
    });
  });
})