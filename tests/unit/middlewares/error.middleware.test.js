const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

const {errorMiddleware} = require('../../../src/middleware');

chai.use(sinonChai);

describe('Testes de Unidade: Error Middleware', function () {
  
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar o status e a mensagem corretos quando o erro possuir status (Erro Customizado)', function () {
    const err = {
      status: 404,
      message: 'Post not found'
    };
    
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    const next = sinon.spy();

    errorMiddleware(err, req, res, next);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Post not found' });
  });

  it('Deve retornar status 500 e mensagem genérica quando o erro NÃO possuir status (Erro Interno)', function () {
    const err = new Error('Connection refused'); 
    
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    const next = sinon.spy();
    const consoleStub = sinon.stub(console, 'error');

    errorMiddleware(err, req, res, next);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Erro interno do servidor' });
    expect(consoleStub).to.have.been.calledWith(err);
  });
});