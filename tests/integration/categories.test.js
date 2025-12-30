const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../src/app');
const { CategoryService } = require('../../src/service');
const jwt = require('../../src/utils/JWT');
const AuthError = require('../../src/Errors/AuthError');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Testes de integração: /categories', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe("GET /categories", function () {
    it('Deve retornar status 200 e a lista de categorias (Com Token Válido)', async function () {
      const mockCategories = [
        { id: 1, name: 'Inovação' },
        { id: 2, name: 'Escola' }
      ];

      sinon.stub(jwt, 'verifyToken').returns({ id: 1, email: 'teste@teste.com' });
      sinon.stub(CategoryService, 'getCategories').resolves(mockCategories);

      const response = await chai.request(app).get('/categories')
        .set('Authorization', 'Bearer ampiu1qwfp21334t2ef');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(mockCategories);
    });

    it('Deve retornar status 401 se não enviar um token', async function () {
      const response = await chai.request(app).get('/categories');

      expect(response.status).to.be.eq(401);
      expect(response.body).to.be.deep.equal({ message: 'Token not found' })
    });

    it('Deve retornar erro 401 caso o token seja inválido ou expirado', async function () {
      sinon.stub(jwt, 'verifyToken').throws(new AuthError('Expired or invalid token', 401));

      const response = await chai.request(app).get('/categories').set('Authorization', 'Bearer tokeninvalido');

      expect(response.status).to.be.eq(401);
      expect(response.body).to.be.deep.equal({ message: 'Expired or invalid token' })
    });
  });

  describe('POST /categories', function () {
    it('Deve retornar status 201 e o body com a nova categoria', async function () {
      const mockCategory = { id: 1, name: "java" };

      sinon.stub(jwt, 'verifyToken').returns({ id: 1, email: 'teste@teste.com' });
      sinon.stub(CategoryService, 'createCategory').resolves(mockCategory);

      const response = await chai.request(app).post('/categories').send({ name: 'java' })
        .set('Authorization', 'Bearer token132165498');

      expect(response.status).to.be.eq(201);
      expect(response.body).to.deep.equal(mockCategory);
    });

    it('Deve retornar erro 400 se não enviar o campo "name"', async function () {
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, email: 'teste@teste.com' });

      const response = await chai.request(app)
        .post('/categories')
        .send({})
        .set('Authorization', 'Bearer token_valido');

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.equal('"name" is required');
    });
  });
});