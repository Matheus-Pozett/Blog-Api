/* eslint-disable max-lines */
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogs API',
      version: '1.0.0',
      description: 'API para gerenciamento de blogs, posts, categorias e usuários',
      contact: {
        name: 'Matheus Pozett',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do usuário',
            },
            displayName: {
              type: 'string',
              description: 'Nome de exibição do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            image: {
              type: 'string',
              description: 'URL da imagem do usuário',
            },
          },
        },
        UserInput: {
          type: 'object',
          required: ['displayName', 'email', 'password'],
          properties: {
            displayName: {
              type: 'string',
              minLength: 8,
              description: 'Nome de exibição do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Senha do usuário',
            },
            image: {
              type: 'string',
              description: 'URL da imagem do usuário',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID da categoria',
            },
            name: {
              type: 'string',
              description: 'Nome da categoria',
            },
          },
        },
        CategoryInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome da categoria',
            },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do post',
            },
            title: {
              type: 'string',
              description: 'Título do post',
            },
            content: {
              type: 'string',
              description: 'Conteúdo do post',
            },
            userId: {
              type: 'integer',
              description: 'ID do autor do post',
            },
            published: {
              type: 'string',
              format: 'date-time',
              description: 'Data de publicação',
            },
            updated: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
            categories: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Category',
              },
            },
          },
        },
        PostInput: {
          type: 'object',
          required: ['title', 'content', 'categoryIds'],
          properties: {
            title: {
              type: 'string',
              description: 'Título do post',
            },
            content: {
              type: 'string',
              description: 'Conteúdo do post',
            },
            categoryIds: {
              type: 'array',
              items: {
                type: 'integer',
              },
              description: 'IDs das categorias do post',
            },
          },
        },
        PostUpdate: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            title: {
              type: 'string',
              description: 'Título do post',
            },
            content: {
              type: 'string',
              description: 'Conteúdo do post',
            },
          },
        },
        Token: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
