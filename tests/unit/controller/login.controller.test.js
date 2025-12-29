const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {LoginController} = require('../../../src/controller');
const {LoginService} = require('../../../src/service');
const {token} = require('../mocks/userMock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes de unidade: LoginController', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Função Login', function () {
    it('Testa se login é efetuado com sucesso e retorna token e status 200', async function() {
      const req = {
        body: {
          email: "lewishamilton@gmail.com",
          password: "123456"
        }  
      }

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()  
      }

      sinon.stub(LoginService, 'login').resolves(token);

      await LoginController.login(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({token});
      expect(LoginService.login).to.have.been.calledWith(req.body);
    });
  });
});