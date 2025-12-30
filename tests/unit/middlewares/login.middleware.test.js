const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {loginMiddleware} = require('../../../src/middleware');
const LoginInvalidError = require('../../../src/Errors/LoginInvalidError');

const {expect} = chai;

chai.use(sinonChai);

describe('Testes de unidade: Middlewares para Login', function () {
  afterEach(function() {
    sinon.restore()
  });

  it("Password não informado ou vazio", function() {
    const req = {
      body: { email: 'test@test.com', password: '' }
    }

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const next = sinon.stub().returns();

    try {
      loginMiddleware(req, res, next);
      throw new Error("O teste falhou: middleware não lançou erro de validação"); 
    } catch (error) {
      expect(error).to.be.instanceOf(LoginInvalidError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.eq('Some required fields are missing');
    }
  });

    it("Email não informado ou vazio", function() {
    const req = {
      body: { password: '123456' }
    }

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const next = sinon.stub().returns();

    try {
      loginMiddleware(req, res, next);
      throw new Error("O teste falhou: middleware não lançou erro de validação") 
    } catch (error) {
      expect(error).to.be.instanceOf(LoginInvalidError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.eq('Some required fields are missing')
    }
  });

  it('Função next é chamada quando os dados estão corretos', function () {
    const req = {
      body: { email: 'test@test.com', password: '123456' }
    }

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const next = sinon.stub().returns();

    loginMiddleware(req, res, next);

    expect(next).to.have.been.called;
    });
})