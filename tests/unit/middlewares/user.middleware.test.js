const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const {userMiddleware} = require('../../../src/middleware');
const UserError = require('../../../src/Errors/UserError');

chai.use(sinonChai);

describe('Testes de Unidade: Middleware de Usuário (Validação)', function () {
  
  it('Deve chamar next() se todos os campos forem válidos', function () {
    const req = {
      body: {
        displayName: "Matheus Pozett",
        email: "matheus@teste.com",    
        password: "123456",            
        image: "http://foto.com/eu.png"
      }
    };
    const res = {};
    const next = sinon.spy();

    userMiddleware(req, res, next);

    expect(next).to.have.been.called;
  });

  it('Deve lançar erro se "displayName" tiver menos de 8 caracteres', function () {
    const req = {
      body: {
        displayName: "Math",
        email: "matheus@teste.com",
        password: "123456"
      }
    };
    const res = {};
    const next = sinon.spy();

    try {
      userMiddleware(req, res, next);
      throw new Error('Falha: Deveria ter lançado erro de validação');
    } catch (error) {
      expect(error).to.be.instanceOf(UserError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.include('"displayName" length must be at least 8 characters long');
      expect(next).not.to.have.been.called;
    }
  });

  it('Deve lançar erro se o "email" for inválido', function () {
    const req = {
      body: {
        displayName: "Matheus Pozett",
        email: "nao-e-um-email",
        password: "123456"
      }
    };
    const res = {};
    const next = sinon.spy();

    try {
      userMiddleware(req, res, next);
    } catch (error) {
      expect(error).to.be.instanceOf(UserError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.include('"email" must be a valid email');
    }
  });

  it('Deve lançar erro se "password" tiver menos de 6 caracteres', function () {
    const req = {
      body: {
        displayName: "Matheus Pozett",
        email: "matheus@teste.com",
        password: "123"
      }
    };
    const res = {};
    const next = sinon.spy();

    try {
      userMiddleware(req, res, next);
    } catch (error) {
      expect(error).to.be.instanceOf(UserError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.include('"password" length must be at least 6 characters long');
    }
  });

  it('Deve lançar erro se um campo obrigatório (ex: email) estiver faltando', function () {
    const req = {
      body: {
        displayName: "Matheus Pozett",
        password: "123456"
        // email faltando
      }
    };
    const res = {};
    const next = sinon.spy();

    try {
      userMiddleware(req, res, next);
    } catch (error) {
      expect(error).to.be.instanceOf(UserError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.include('"email" is required');
    }
  });
});