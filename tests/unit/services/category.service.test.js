const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { Category } = require('../../../src/models');
const CategoryError = require('../../../src/Errors/CategoryError');
const { CategoryService } = require('../../../src/service');

const { expect } = chai;

chai.use(sinonChai);

describe('Testes de unidade: CategoryService', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Função createCategory', function () {
    it('Cria nova categoria no banco de dados', async function() {
      const categoryData = {
        name: "CategoriaNova"
      }

      const newCategoryMock = {
        id: 2,
        name: "CategoriaNova"
      }
      
      sinon.stub(Category, 'findOne').resolves(null);
      sinon.stub(Category, 'create').resolves(newCategoryMock);

      const result = await CategoryService.createCategory(categoryData);
      
      expect(result).to.be.deep.equal(newCategoryMock);
      expect(Category.create).to.have.been.calledWith(categoryData);
    });

    it('Retorna "Category already registered" caso exista categoria no banco de dados', async function () {
      const categoryData = {
        name: "CategoriaNova"
      }

      const newCategoryMock = {
        id: 2,
        name: "CategoriaNova"
      }
      
      sinon.stub(Category, 'findOne').resolves(newCategoryMock);

      try {
        await CategoryService.createCategory(categoryData);
        throw new Error("Service deveria retornar CategoryERROR");
      } catch (error) {
        expect(error).to.be.instanceOf(CategoryError);
        expect(error.status).to.be.eq(409);
        expect(error.message).to.be.eq('Category already registered');
      }
    });
  });

  describe('Função getCategories', function () {
    it('Lista todas as categorias', async function () {
      const categoriesMock = [
        {
          "id": 1,
          "name": "Inovação"
        },
        {
          "id": 2,
          "name": "Escola"
        },
      ];

      sinon.stub(Category, 'findAll').resolves(categoriesMock);

      const result = await CategoryService.getCategories();

      expect(result).to.be.deep.equal(categoriesMock);
    });
  });
});