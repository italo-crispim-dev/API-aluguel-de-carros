## Sobre o projeto
# API de gerenciamento de veiculos e aluguel

Essa API foi desenvolvida com base no desafio backend da empresa Junior Include para o gerenciamento de uma loja de aluguel de veiculos.
A aplicação permitir realizar o cadastro e gerenciamento de veiculos, usuarios e operações de aluguel.

## Antes de executar siga as instruções a baixo:
Para que a API funcionar corretamente é necessário configurar o banco de dados,
as variaveis de ambiente e instalar algumas dependências antes de executar.

## Variaveis de ambiente: 
- A API utiliza variaveis de ambiente para configurar o JWT, o admin padrão e a conexão com o banco de dados;
- Crie um arquivo '.env' na raiz do projeto seguindo essa estrutura abaixo:

      #JWT
      JWT_SECRET='sua_chave_secreta'
      JWT_EXPIRES_IN=1h
      
      # Admin padrao
      ADMIN_EMAIL='seu_email_padrao'
      ADMIN_PASSWORD='sua_senha_padrao'
      
      # Configuracao do banco de dados
      DB_NAME='o_nome_do_banco'
      DB_USER='seu_usuario_do_banco'
      DB_PASSWORD='sua_senha_do_banco'
      DB_HOST=localhost
      DB_PORT=5432

## Banco de dados
-  Essa API utiliza PostgreSQL, antes de executar é necessário criar um banco e definir seu nome no arquivo '.env' conforme descrito acima.

## Dependências:
Essa API utiliza algumas depedências para funcionar corretamente que serão listadas abaixo:

1. **express** - Para API e rotas - `npm install express`;
2. **sequelize** - ORM para trabalhar com PostgreSQL - `npm install sequelize`;
3. **pg** - Driver do PostgreSQL para o node.js - `npm install pg`;
4. **pg-hstore** - Suporte utilizado pelo sequelize com PostgreSQL - `npm install pg-hstore`;
5. **dotenv** - Carregar as variaveis do .env - `npm install dotenv`;
6. **jsonwebtoken** - Criar e verificar tokens JWT - `npm install jsonwebtoken`;
7. **bcrypt** - Gerar hash e verificar senhas - `npm install bcrypt`;
8. **zod** - validar os dados recebidos pela API - `npm install zod`;
9. **swagger-ui-express** - Disponibilizar a documentação Swagger da API - `npm install swagger-ui-express`;

## Funcionalidades da API:

### Veiculos
  - Cadastrar Veiculos;
  - Listar veiculos;
  - Buscar veiculos por ID;
  - Alterar Veiculos por ID;
  - Deletar Veiculos por ID;

### Alugueis
  - Realizar Aluguel;
  - Listar ALugueis;
  - Buscar Aluguel por ID;
  - Alterar Aluguel;
  - Finalizar Aluguel;
  - 
### Usuarios
  - Cadastrar Usuarios;
  - Buscar Usuarios por ID;

### Autentificação
  - Login utilizando email e senha;
  - autentificação com JWT;

## Autentificação e autorização
A API utiliza **JWT (JSON Web Token)** para autenticação dos usuários.

Após realizar o login utilizando e-mail e senha, a API retorna um token JWT.
Esse token deve ser enviado nas requisições às rotas protegidas.

Algumas operações possuem **autorização por `role`**, sendo permitidas
apenas para usuários com a role `ADMIN`. O usuário administrador padrão
é criado automaticamente conforme descrito na configuração da aplicação.

### Autenticação

Para acessar as rotas protegidas, é necessário enviar o token no cabeçalho:

`Authorization: Bearer SEU_TOKEN`

### Veiculos 
  - Cadastrar Veículos       |  ADMIN
  - Listar veículos;         |  Usuário autenticado
  - Buscar veículos por ID;  | Usuário autenticado
  - Alterar Veículos por ID; | ADMIN
  - Deletar Veículos por ID; | ADMIN

### Alugueis
  - Realizar Aluguel;      | Usuário autenticado
  - Listar ALugueis;       | Usuário autenticado
  - Buscar Aluguel por ID; | Usuário autenticado
  - Alterar Aluguel;       | Usuário autenticado
  - Finalizar Aluguel;     | ADMIN
  - 
### Usuarios
  - Cadastrar Usuarios;     | Não requer autentificação
  - Buscar Usuários por ID; | ADMIN

### Autentificação
  - Login utilizando email e senha; | Não requer autentificação


