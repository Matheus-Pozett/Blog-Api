const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../src/app');
const { UserService } = require('../../src/service');
const jwt = require('../../src/utils/JWT');
const { allUsersMock, userIdMock } = require('../unit/mocks/userMock');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);

const USER = { id: 1, email: 'teste@teste.com' }

describe('Testes de integração: /user', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('GET /user', function() {
    it('Deve retornar status 200 e a lista de usuarios', async function() {

      sinon.stub(jwt, 'verifyToken').returns(USER);
      sinon.stub(UserService, 'getAllUsers').resolves(allUsersMock);

      const response = await chai.request(app).get('/user').set('Authorization', 'Bearer token9741');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.equal(allUsersMock);
    });
  })

  describe('GET /user/:id', function () {
    it('Deve retornar status 200 e usuário pelo ID', async function() {

      sinon.stub(jwt, 'verifyToken').returns(USER);
      sinon.stub(UserService, 'getUserById').resolves(userIdMock);
      const response = await chai.request(app).get('/user/2').set('Authorization', 'Bearer token9741');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.equal(userIdMock);
    });
  });

  describe('POST /user', function () {
    it('Deve retornar status 201 e o body com o token gerado', async function() {
      const token = 'tokengerado';
      const userData = {
        displayName: "Brett Wiltshire",
        email: "brett@email.com",
        password: "123456",
      }

      sinon.stub(UserService, 'createUser').resolves(token);
      const response = await chai.request(app).post('/user')
        .send(userData);

      expect(response.status).to.be.eq(201);
      expect(response.body).to.be.deep.equal({token});
    });

    it('Deve retornar erro 400 ao tentar criar usuário com email inválido', async function() {
      const invalidUser = {
        displayName: "Brett Wiltshire",
        email: "email-errado",
        password: "123456",
      }

      const response = await chai.request(app)
        .post('/user')
        .send(invalidUser);

      expect(response.status).to.be.eq(400);
      expect(response.body.message).to.include('"email" must be a valid email');
    });
  });
});
