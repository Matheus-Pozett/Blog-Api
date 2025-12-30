const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const app = require('../../src/app');
const { LoginService } = require('../../src/service');
const jwt = require('../../src/utils/JWT');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Testes de integração: /login', function () {
  afterEach(function() {
    sinon.restore();
  });

  describe('POST /login', function() {
    it('Deve retornar status 200 e token ao efetuar login com sucesso', async function() {
      const token = 'agw6r54QWQRg12314HKLJH';

      sinon.stub(LoginService, 'login').resolves(token);

      const response = await chai.request(app).post('/login')
        .send({
        email: "lewishamilton@gmail.com",
        password: "123456"
      });

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.equal({token});
    });

    it('Deve retornar erro 400 se faltar campo obrigatório (Middleware)', async function() {
      const response = await chai.request(app).post('/login')
        .send({
          email: "lewishamilton@gmail.com" 
          // password faltando
        });

      expect(response.status).to.be.eq(400);
      expect(response.body.message).to.exist;
    });
  })
});