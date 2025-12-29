const chai = require("chai");
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { User } = require('../../../src/models');
const UserError = require('../../../src/Errors/UserError');
const { UserService } = require('../../../src/service');
const jwtUtils = require('../../../src/utils/JWT');
const {userMock, 
  userSequelizeMock, 
  token, 
  allUsersMock,
  userIdMock,
} = require('../mocks/userMock')
const { expect } = chai;
chai.use(sinonChai);

describe('Teste de unidades: Service User', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('Não é possivel cadastrar um usuário que já existe', async function() {
    const userData = {
      displayName: "Michael Schumacher",
      email: "MichaelSchumacher@gmail.com",
      password: "123456",
      image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }

    sinon.stub(User, 'findOne').resolves(userMock);

    try {
      await UserService.createUser(userData);
      throw new Error('Deveria ter lançado erro de conflito');
    } catch (error) {
      expect(error).to.be.instanceOf(UserError);
      expect(error.status).to.be.eq(409);
      expect(error.message).to.be.eq('User already registered');
    }
  });

  it('Usuário criado com sucesso', async function () {
    const newUserData = {
      displayName: "Michael Schumacher",
      email: "novo@teste.com",
      password: "123456",
    }

    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User, 'create').resolves(userSequelizeMock);
    sinon.stub(jwtUtils, 'generateToken').returns(token);

    const result = await UserService.createUser(newUserData);
    
    expect(result).to.have.been.eq(token);
  });

  it('Lista todos os usuários', async function() {
    sinon.stub(User, 'findAll').resolves(allUsersMock);

    const result = await UserService.getAllUsers();

    expect(result).to.be.deep.equal(allUsersMock);
    expect(User.findAll).to.have.been.calledWith({
      attributes: { exclude: ['password'] }
    });
  });

  it('Lista usuário por ID', async function() {
    const id = 2;
    sinon.stub(User, 'findByPk').resolves(userIdMock);

    const result = await UserService.getUserById(id);
    
    expect(result).to.be.deep.equal(userIdMock);
    expect(User.findByPk).to.have.been.calledWith(2, {
      attributes: { exclude: ['password'] },
    })
  });

  it('Retorna "User does not exist" caso não seja encontrado por ID', async function() {
    const id = 99;

    sinon.stub(User, 'findByPk').resolves(null);

    try {
      await UserService.getUserById(id);
      throw new Error('Deveria ter lançado erro 404');
    } catch (error) {
      expect(error).to.be.instanceOf(UserError);
      expect(error.status).to.be.eq(404);
      expect(error.message).to.be.eq('User does not exist');
    }
  });

  describe('Função deleteUser', function () {
    it('Deleta o usuário logado com sucesso', async function () {
      const userData = { id: 5 };
      
      const userMock = { id: 5, displayName: "User Exemplo" };
      sinon.stub(User, 'findByPk').resolves(userMock);

      sinon.stub(User, 'destroy').resolves(1);

      await UserService.deleteUser(userData);

      expect(User.destroy).to.have.been.calledWith({
        where: { id: 5 }
      });
    });

    it('Lança erro se o usuário não for encontrado', async function () {
      const userData = { id: 999 };

      sinon.stub(User, 'findByPk').resolves(null);

      try {
        await UserService.deleteUser(userData);
        throw new Error('Deveria ter lançado erro de usuário não encontrado');
      } catch (error) {
        expect(error).to.be.instanceOf(UserError);
        expect(error.status).to.be.equal(404);
        expect(error.message).to.be.equal('User does not exist');
      }
    });
  });
});