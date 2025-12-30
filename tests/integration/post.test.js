const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../src/app');
const { PostService } = require('../../src/service');
const jwt = require('../../src/utils/JWT');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);

const userMock = { id: 1, email: 'teste@teste.com' };

const postMock = {
  id: 1,
  title: "Post de Teste",
  content: "Conteúdo do post",
  userId: 1,
  published: "2025-01-01T00:00:00.000Z",
  updated: "2025-01-01T00:00:00.000Z"
};

describe('Testes de Integração: Rotas de /post', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('POST /post', function () {
    it('Deve criar um novo post com sucesso (Status 201)', async function () {
      sinon.stub(jwt, 'verifyToken').returns(userMock);
      sinon.stub(PostService, 'createPost').resolves(postMock);

      const response = await chai.request(app)
        .post('/post')
        .set('Authorization', 'Bearer token_valido')
        .send({
          title: "Post de Teste",
          content: "Conteúdo do post",
          categoryIds: [1, 2]
        });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(postMock);
    });

    it('Deve retornar 400 se faltar campos obrigatórios (Middleware)', async function () {
      sinon.stub(jwt, 'verifyToken').returns(userMock);

      const response = await chai.request(app)
        .post('/post')
        .set('Authorization', 'Bearer token_valido')
        .send({ title: "Só titulo" });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.equal('Some required fields are missing');
    });
  });

  describe('GET /post', function () {
    it('Deve retornar a lista de posts (Status 200)', async function () {
      const listMock = [postMock, { ...postMock, id: 2 }];

      sinon.stub(jwt, 'verifyToken').returns(userMock);
      sinon.stub(PostService, 'getAllPosts').resolves(listMock);

      const response = await chai.request(app)
        .get('/post')
        .set('Authorization', 'Bearer token_valido');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(listMock);
    });
  });

  describe('GET /post/:id', function () {
    it('Deve retornar um post específico pelo ID (Status 200)', async function () {
      sinon.stub(jwt, 'verifyToken').returns(userMock);
      sinon.stub(PostService, 'getPostById').resolves(postMock);

      const response = await chai.request(app)
        .get('/post/1')
        .set('Authorization', 'Bearer token_valido');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(postMock);
    });

    it('Deve retornar 404 se o post não existir (Erro do Service)', async function () {
      sinon.stub(jwt, 'verifyToken').returns(userMock);
      const errorMock = { status: 404, message: 'Post does not exist' };
      sinon.stub(PostService, 'getPostById').rejects(errorMock);

      const response = await chai.request(app)
        .get('/post/999')
        .set('Authorization', 'Bearer token_valido');

      expect(response.status).to.be.equal(404);
      expect(response.body).to.deep.equal({ message: 'Post does not exist' });
    });
  });

  describe('PUT /post/:id', function () {
    it('Deve atualizar um post com sucesso (Status 200)', async function () {
      const updatedMock = { ...postMock, title: "Novo Titulo" };

      sinon.stub(jwt, 'verifyToken').returns(userMock);
      sinon.stub(PostService, 'updatePost').resolves(updatedMock);

      const response = await chai.request(app)
        .put('/post/1')
        .set('Authorization', 'Bearer token_valido')
        .send({
          title: "Novo Titulo",
          content: "Conteúdo editado"
        });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(updatedMock);
    });

    it('Deve retornar 401 se usuário tentar editar post de outro dono (Service)', async function () {
      sinon.stub(jwt, 'verifyToken').returns(userMock);
      
      const unauthorizedError = { status: 401, message: 'Unauthorized user' };
      sinon.stub(PostService, 'updatePost').rejects(unauthorizedError);

      const response = await chai.request(app)
        .put('/post/1')
        .set('Authorization', 'Bearer token_valido')
        .send({ 
          title: "Tentativa Hacker", 
          content: "The whole text for the blog post goes here in this key"
        });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.equal('Unauthorized user');
    });
  });

  describe('GET /post/search', function () {
    it('Deve buscar posts pelo termo da query string (Status 200)', async function () {
      const searchResult = [postMock];

      sinon.stub(jwt, 'verifyToken').returns(userMock);
      sinon.stub(PostService, 'searchPostByTerm').resolves(searchResult);

      const response = await chai.request(app)
        .get('/post/search?q=Teste') 
        .set('Authorization', 'Bearer token_valido');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(searchResult);
    });
    
    it('Deve retornar lista vazia se nada for encontrado', async function () {
      sinon.stub(jwt, 'verifyToken').returns(userMock);
      sinon.stub(PostService, 'searchPostByTerm').resolves([]);

      const response = await chai.request(app)
        .get('/post/search?q=Nada') 
        .set('Authorization', 'Bearer token_valido');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array').that.is.empty;
    });
  });
});