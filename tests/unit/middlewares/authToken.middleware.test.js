const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

const {authToken} = require('../../../src/middleware');
const jwt = require('../../../src/utils/JWT'); 
const AuthError = require('../../../src/Errors/AuthError');

chai.use(sinonChai);

describe('Testes de Unidade: Middleware de Autenticação (authToken)', function () {
  
  afterEach(function () {
    sinon.restore();
  });

  it('Deve chamar next() e preencher req.user quando o token for válido', function () {
    const userMock = { id: 1, email: 'teste@teste.com' };

    sinon.stub(jwt, 'verifyToken').returns(userMock);

    const req = {
      headers: {
        authorization: 'Bearer token_super_valido'
      }
    };
    const res = {};
    const next = sinon.spy();

    authToken(req, res, next);

    expect(jwt.verifyToken).to.have.been.calledWith('token_super_valido');
    expect(req.user).to.be.deep.equal(userMock);
    expect(next).to.have.been.called;
  });

  it('Deve lançar AuthError (401) se o header authorization não existir', function () {
    const req = {
      headers: {}
    };
    const res = {};
    const next = sinon.spy();

    try {
      authToken(req, res, next);
      throw new Error('Deveria ter lançado erro de token não encontrado');
    } catch (error) {
      expect(error).to.be.instanceOf(AuthError);
      expect(error.status).to.be.equal(401);
      expect(error.message).to.be.equal('Token not found');
      expect(next).not.to.have.been.called;
    }
  });

  it('Deve lançar erro se o token for inválido (propagado do jwt.verifyToken)', function () {
    sinon.stub(jwt, 'verifyToken').throws(new Error('Expired or invalid token'));

    const req = {
      headers: { authorization: 'Bearer token_podre' }
    };
    const res = {};
    const next = sinon.spy();

    try {
      authToken(req, res, next);
      throw new Error('Deveria ter falhado na verificação');
    } catch (error) {
      expect(error.message).to.be.equal('Expired or invalid token');
      expect(next).not.to.have.been.called;
    }
  });
});