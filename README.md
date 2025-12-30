# 📝 Blogs API

[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.30-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

API RESTful completa para gerenciamento de blogs, desenvolvida com Node.js, Express e Sequelize ORM. Sistema robusto de autenticação JWT, documentação interativa com Swagger e arquitetura em camadas seguindo as melhores práticas de desenvolvimento.

## Sobre o Projeto

Esta é uma API profissional para plataforma de blogs que permite aos usuários criar, ler, atualizar e deletar posts, gerenciar categorias e usuários. O projeto implementa autenticação segura, relacionamentos complexos entre entidades e oferece uma documentação interativa completa.

## Principais Aprendizados

- Desenvolvimento de APIs RESTful escaláveis
- Implementação de autenticação JWT
- ORM Sequelize e relacionamentos complexos
- Arquitetura em camadas (MSC)
- Testes automatizados
- Documentação de APIs com Swagger
- Containerização com Docker
- Boas práticas de código e padrões de projeto

### Principais Funcionalidades

- **Autenticação JWT** - Sistema seguro de login e autorização
- **Gerenciamento de Usuários** - CRUD completo de usuários
- **Sistema de Posts** - Criação e gerenciamento de posts com múltiplas categorias
- **Categorias** - Organização de conteúdo por categorias
- **Busca de Posts** - Pesquisa por título ou conteúdo
- **Documentação Swagger** - Documentação interativa da API
- **Docker** - Ambiente containerizado pronto para deploy
- **Testes** - Cobertura de testes unitários e de integração

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web minimalista
- **Sequelize** - ORM para Node.js
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **Swagger** - Documentação da API
- **Docker & Docker Compose** - Containerização
- **Jest** - Framework de testes
- **ESLint** - Linter para padronização de código
- **Joi** - Validação de dados

## Pré-requisitos

- Node.js 16 ou superior
- Docker e Docker Compose
- npm ou yarn

## Como Executar

### Com Docker (Recomendado)

1. **Clone o repositório**
```bash
git clone git@github.com:Matheus-Pozett/Blog-Api.git
cd Blog-Api
```

2. **Suba os containers**
```bash
docker-compose up -d --build
```

3. **Acesse o container**
```bash
docker exec -it blogs_api bash
```

4. **Instale as dependências**
```bash
npm install
```

5. **Execute as migrations e seeders**
```bash
npm run prestart
npm run seed
```

6. **Inicie o servidor**
```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`

## 📚 Documentação da API

Acesse a documentação interativa Swagger em: **http://localhost:3001/api-docs**

A documentação Swagger oferece:
- Interface interativa para testar todos os endpoints
- Exemplos de requisições e respostas
- Descrição detalhada de cada endpoint
- Autenticação JWT integrada

### Autenticação

Para endpoints protegidos, você precisa:

1. Fazer login em `/login` ou criar usuário em `/user`
2. Copiar o token JWT retornado
3. Clicar em "Authorize" no Swagger e inserir: `Bearer {seu-token}`
4. Testar os endpoints protegidos

## Endpoints Principais

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/login` | Realizar login | ❌ |

### Usuários

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/user` | Criar novo usuário | ❌ |
| GET | `/user` | Listar todos os usuários | ✅ |
| GET | `/user/:id` | Buscar usuário por ID | ✅ |
| DELETE | `/user/me` | Deletar usuário autenticado | ✅ |

### Categorias

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/categories` | Criar nova categoria | ✅ |
| GET | `/categories` | Listar todas as categorias | ✅ |

### Posts

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/post` | Criar novo post | ✅ |
| GET | `/post` | Listar todos os posts | ✅ |
| GET | `/post/:id` | Buscar post por ID | ✅ |
| GET | `/post/search?q=termo` | Buscar posts por termo | ✅ |
| PUT | `/post/:id` | Atualizar post | ✅ |
| DELETE | `/post/:id` | Deletar post | ✅ |

## Testes

O projeto possui cobertura de testes unitários e de integração:

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test-coverage

# Executar teste específico
npm test nome-do-arquivo.test
```

**Cobertura de Testes:**
- ✅ Controllers
- ✅ Services
- ✅ Middlewares
- ✅ Models
- ✅ Integração de endpoints

## Segurança

- **JWT Authentication** - Tokens seguros para autenticação
- **Bcrypt** - Hash de senhas
- **Validação de Dados** - Joi para validação de inputs
- **Error Handling** - Tratamento centralizado de erros
- **SQL Injection Protection** - Sequelize ORM

---
**Matheus Pozett**

- [LinkedIn](https://www.linkedin.com/in/matheus-pozett/)
---