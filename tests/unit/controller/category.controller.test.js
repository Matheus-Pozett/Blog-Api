const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const { CategoriesController } = require('../../../src/controller');
const { CategoryService } = require('../../../src/service');

chai.use(sinonChai);

describe('Testes de Unidade: CategoryController', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Função createCategory', function () {
    it('Deve criar uma categoria e retornar status 201 com o objeto criado', async function() {
      const req = {
        body: { name: "Inovação" }
      };
      const res = {
        status: sinon.stub().returnsThis(), 
        json: sinon.stub()
      };

      const mockResult = { id: 1, name: "Inovação" };

      sinon.stub(CategoryService, 'createCategory').resolves(mockResult);

      await CategoriesController.createCategory(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockResult);
      expect(CategoryService.createCategory).to.have.been.calledWith(req.body);
    });
  });

  describe('Função getCategories', function () {
    it('Deve retornar status 200 e a lista de todas as categorias', async function() {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      const mockList = [
        { id: 1, name: "Inovação" },
        { id: 2, name: "Escola" }
      ];

      sinon.stub(CategoryService, 'getCategories').resolves(mockList);

      await CategoriesController.getCategories(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockList);
      expect(CategoryService.getCategories).to.have.been.called;
    });
  });
});