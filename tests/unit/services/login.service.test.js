const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {LoginService} = require('../../../src/service');
const {User} = require('../../../src/models');
const jwt = require('../../../src/utils/JWT');
const LoginInvalidError = require('../../../src/Errors/LoginInvalidError');
const {userMock, userSequelizeMock, token} = require('../mocks/userMock');
const {expect} = chai;

chai.use(sinonChai);

describe('Testes de unidade: Service Login', function () {
  afterEach(function () {
    sinon.restore();
  });

  it("Retorna erro caso não seja encontrado um usuario com email passado", async function () {
    const loginInvalidMock = {
      email: "michael@gmail.com",
      password: "123456"
    }

    sinon.stub(User, 'findOne').resolves(null);

    try {
      await LoginService.login(loginInvalidMock);
      throw new Error('Deveria ter lançado um erro!');
    } catch (error) {
      expect(error).to.be.instanceOf(LoginInvalidError);
      expect(error.message).to.be.eq('Invalid fields')
    }
  });

  it("Retorna erro caso senha esteja incorreta", async function () {
    const loginInvalidMock = {
      email: "MichaelSchumacher@gmail.com",
      password: "12345"
    }

    sinon.stub(User, 'findOne').resolves(userMock);

    try {
      await LoginService.login(loginInvalidMock);
      throw new Error('Deveria ter lançado um erro!');
    } catch (error) {
      expect(error).to.be.instanceOf(LoginInvalidError);
      expect(error.message).to.be.eq('Invalid fields')
    }
  });
  
  it("Retorna token em caso de login efetuado com sucesso", async function() {
    const loginMock = {
      email: "MichaelSchumacher@gmail.com",
      password: "123456"
    }

    sinon.stub(User, 'findOne').resolves(userSequelizeMock);
    sinon.stub(jwt, 'generateToken').returns(token);
  
    const result = await LoginService.login(loginMock);
    
    expect(result).to.be.eq(token);
  });
});