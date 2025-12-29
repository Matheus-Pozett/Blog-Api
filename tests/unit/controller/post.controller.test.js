const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {PostController} = require('../../../src/controller');
const {PostService} = require('../../../src/service');
const {mockUpdatedPost, mockAllPosts, mockPostId} = require('../mocks/postMock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes de unidade: PostController', function () {
  afterEach(function() {
    sinon.restore();
  });

  describe('Função createPost', function() {
    it('Retorna 201 e o novo post cadastrado', async function() {
      const req = {
        body: {
          title: "Latest updates, August 1st",
          content: "The whole text for the blog post goes here in this key",
          categoryIds: [1, 2]
        },
        user: { id: 2 }
      }

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      const newPost = {
        id: 9,
        title: "Latest updates, August 1st",
        content: "The whole text for the blog post goes here in this key",
        userId: 2,
        updated: "2025-12-29T13:39:32.431Z",
        published: "2025-12-29T13:39:32.431Z"
      }

      sinon.stub(PostService, 'createPost').resolves(newPost);

      await PostController.createPost(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newPost);
      expect(PostService.createPost).to.have.been.calledWith(req.body, req.user.id);
    });
  });

  describe('Função updatePost', function() {
    it('Atualiza post e retorna status 200', async function () {
      const req = {
        body: {
          title: "Latest updates, August 1st",
          content: "The whole text for the blog post goes here in this key"
        },
        params: { id: 3 },
        user: { id: 2 }
      }

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(PostService, 'updatePost').resolves(mockUpdatedPost);

      await PostController.updatePost(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockUpdatedPost);
      expect(PostService.updatePost).to.have.been.calledWith(req.params.id, req.user, req.body);
    });
  });

  describe('Função getAllPosts', function() {
    it('Retorna 200 e uma lista com todos os posts', async function () {
      const req = {}

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(PostService, 'getAllPosts').resolves(mockAllPosts);

      await PostController.getAllPosts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockAllPosts);
      expect(PostService.getAllPosts).to.have.been.called;
    });
  });

  describe('Função getPostById', function() {
    it('Retorna 200 e o post pelo ID', async function () {
      const req = {
        params: { id: 3 }
      }

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(PostService, 'getPostById').resolves(mockPostId);

      await PostController.getPostById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockPostId);
      expect(PostService.getPostById).to.have.been.calledWith(req.params.id);
    });
  });

  describe('Função searchPostByTerm', function() {
    it('Retorna uma lista de posts buscados pela query da rota', async function() {
      const req = {
        query: { q: "blog" }
      }

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(PostService, 'searchPostByTerm').resolves(mockAllPosts);

      await PostController.searchPostByTerm(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockAllPosts);
      expect(PostService.searchPostByTerm).to.have.been.calledWith(req.query.q);
    });
  });

  describe('Função deletePost', function() {
    it('Deleta post e retorna status 204', async function () {
      const req = {
        params: { id: 1 },
        user: { id: 2 }
      };

      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub() 
      };

      sinon.stub(PostService, 'deletePost').resolves();

      await PostController.deletePost(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.called;
      expect(PostService.deletePost).to.have.been.calledWith(1, req.user);
    });
  });
});