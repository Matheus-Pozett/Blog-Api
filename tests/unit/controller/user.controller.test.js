const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {UserController} = require('../../../src/controller');
const {UserService} = require('../../../src/service');
const {token, allUsersMock, userIdMock} = require('../mocks/userMock');

const { expect } = chai;

chai.use(sinonChai);

describe.only("Testes de unidade: UserController", function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Função createUser', function () {
    it('Cria usuário e retorna um token JWT com status 201', async function () {
      const req = {
        body: {
          displayName: "Brett Wiltshire",
          email: "brett@email.com",
          password: "123456",
          image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
        }
      }

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(UserService, 'createUser').resolves(token);

      await UserController.createUser(req, res);
      
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ token });
      expect(UserService.createUser).to.have.been.calledWith(req.body);
    });
  })

  describe('Função getUsers', function() {
    it('Retorna status 200 e uma lista de usuários', async function() {
      const req = {}
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(UserService, 'getAllUsers').resolves(allUsersMock);

      await UserController.getUsers(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allUsersMock);
      expect(UserService.getAllUsers).to.have.been.called;
    });
  });

  describe('Função getUserById', function () {
    it('Retorna status 200 e um objeto com o usuário encontrado pelo ID', async function() {
      const req = {
        params: { id: 2 }
      }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      }

      sinon.stub(UserService, 'getUserById').resolves(userIdMock);

      await UserController.getUserById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(userIdMock);
      expect(UserService.getUserById).to.have.been.calledWith(req.params.id);
    });
  });

  describe('Função deleteUser', function() {
    it('Retorna status 204 ao deletar usuario', async function() {
      const req = {
        user: { id: 2 }
      }
      const res = {
        status: sinon.stub().returnsThis(),
        end: sinon.stub()
      }

      sinon.stub(UserService, 'deleteUser').resolves();

      await UserController.deleteUser(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.called;
      expect(UserService.deleteUser).to.have.been.calledWith(req.user);
    });
  })
});