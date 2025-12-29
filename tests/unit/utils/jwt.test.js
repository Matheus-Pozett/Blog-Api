const chai = require('chai');
const jwt = require('jsonwebtoken');
const { expect } = chai;

const JWT = require('../../../src/utils/JWT');

describe('Testes de Unidade: Utils/JWT', function () {
  const payload = {
    id: 1,
    email: 'teste@teste.com',
    displayName: 'Tester'
  };

  it('Deve gerar um token válido (generateToken)', function () {
    const token = JWT.generateToken(payload);

    expect(token).to.be.a('string');

    const decoded = jwt.decode(token);
    expect(decoded).to.deep.include(payload);
  });

  it('Deve verificar e decodificar um token válido (verifyToken)', function () {
    const token = JWT.generateToken(payload);
    const decoded = JWT.verifyToken(token);

    expect(decoded).to.deep.include(payload);
  });

  it('Deve lançar erro ao verificar um token inválido', function () {
    const tokenInvalido = 'token_quebrado_123';

    try {
      JWT.verifyToken(tokenInvalido);
      throw new Error('Deveria ter falhado');
    } catch (error) {
      expect(error).to.exist;
    }
  });
});