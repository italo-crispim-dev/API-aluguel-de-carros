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

### Usuarios
  - Cadastrar Usuarios;
  - Buscar Usuarios por ID;


### Autenticação
  - Login utilizando email e senha;
  - autenticação com JWT;


## Autenticação e autorização
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
    
### Usuarios
  - Cadastrar Usuarios;     | Não requer autenticação
  - Buscar Usuários por ID; | ADMIN

### Autenticação
  - Login utilizando email e senha; | Não requer autenticação

## Regras de negocio
Os serviços dessa API, contam com algumas regras de negocio para garantir o gerenciamento adequado do aluguel dos veiculos, dentre elas podemos destacar:

1. Não é possível alterar um aluguel com o status de `FINALIZADO'`.
2. Não é possível excluir um aluguel, ao invés disso. o aluguel tem seu status alterado de 'ATIVO' para `Finalizado`, essa operação também altera o status do veiculo de `ALUGADO` para `DISPONIVEL`.
3. Não é possível associar um veiculo com o status `ALUGADO` a um novo aluguel ou alteração de um aluguel existente.
4. Não é possível deletar ou alterar um veiculo com o status `ALUGADO`.
5. Não é possível realizar um aluguel de um veiculo que não esteja com o status `DISPONIVEL`
6. Ao realizar um aluguel, o status do veículo é alterado de `DISPONIVEL` para ALUGADO.
7. O valor total do aluguel é calculado com base na quantidade de dias do aluguel e no valor da diária do veículo.

## Documenteção com Swagger
Essa API conta com uma documentação swagger para consultar os endpoints e facilitar os testes da API, a documentção estará acessivel em: http://localhost:3000/api-docs , após todas as configurações acima estiverem criadas e em execução.





