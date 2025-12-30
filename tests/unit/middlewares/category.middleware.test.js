const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {categoryMiddleware} = require('../../../src/middleware');
const CategoryError = require('../../../src/Errors/CategoryError');

const {expect} = chai;

chai.use(sinonChai);

describe('Testes de unidade: Middlewares para Cateogries', function () {
  it('Deve chamar next() caso o req.body seja válido', function () {
    const req = {
      body: {
        name: "Categoria Válida"
      }
    };
    const res = {};
    
    const next = sinon.spy();

    categoryMiddleware(req, res, next);

    expect(next).to.have.been.called;
  });

  it('Deve lançar CategoryError se o campo "name" não for informado', function () {
    const req = {
      body: {}
    };
    const res = {};
    const next = sinon.spy();

    try {
      categoryMiddleware(req, res, next);
      throw new Error('Deveria ter lançado erro de validação');
    } catch (error) {
      expect(error).to.be.instanceOf(CategoryError);
      expect(error.status).to.be.equal(400);
      expect(error.message).to.be.equal('"name" is required');
      expect(next).not.to.have.been.called;
    }
  });

  it('Deve lançar erro se "name" não for uma string', function () {
    const req = {
      body: { name: 123 } 
    };
    const res = {};
    const next = sinon.spy();

    try {
      categoryMiddleware(req, res, next);
    } catch (error) {
      expect(error).to.be.instanceOf(CategoryError);
      expect(error.message).to.include('must be a string');
    }
  });
});