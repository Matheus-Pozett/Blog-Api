const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {postMiddleware} = require('../../../src/middleware');
const PostError = require('../../../src/Errors/PostError');

const {expect} = chai;

chai.use(sinonChai);

describe('Testes de Unidade: Middleware de Post', function () {
  
  it('Deve chamar next() quando o body estiver completo e válido', function () {
    const req = {
      body: {
        title: "Título do Post",
        content: "Conteúdo interessante",
        categoryIds: [1, 2]
      }
    };
    const res = {};
    const next = sinon.spy();

    postMiddleware(req, res, next);

    expect(next).to.have.been.called;
  });

  it('Deve lançar erro genérico se "title" estiver faltando', function () {
    const req = {
      body: {
        content: "Conteúdo",
        categoryIds: [1]
      }
    };
    const res = {};
    const next = sinon.spy();

    try {
      postMiddleware(req, res, next);
      throw new Error('Deveria ter falhado');
    } catch (error) {
      expect(error).to.be.instanceOf(PostError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('Some required fields are missing');
    }
  });

  it('Deve lançar erro genérico se "content" estiver faltando', function () {
    const req = {
      body: {
        title: "Título",
        categoryIds: [1]
      }
    };
    const res = {};
    const next = sinon.spy();

    try {
      postMiddleware(req, res, next);
    } catch (error) {
      expect(error).to.be.instanceOf(PostError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('Some required fields are missing');
    }
  });

  it('Deve lançar erro específico se "categoryIds" for um array vazio', function () {
    const req = {
      body: {
        title: "Título",
        content: "Conteúdo",
        categoryIds: []
      }
    };
    const res = {};
    const next = sinon.spy();

    try {
      postMiddleware(req, res, next);
    } catch (error) {
      expect(error).to.be.instanceOf(PostError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('one or more "categoryIds" not found');
    }
  });

  it('Deve lançar erro genérico se "title" for uma string vazia', function () {
    const req = {
      body: {
        title: "",
        content: "Conteúdo",
        categoryIds: [1]
      }
    };
    const res = {};
    const next = sinon.spy();

    try {
      postMiddleware(req, res, next);
    } catch (error) {
      expect(error.message).to.be.equal('Some required fields are missing');
    }
  });
});