yarn init -y
yarn add express

criar os arquivso src/app, routes, server

yarn add sucrase nodemon -D
//Sucrase eh para permitir usar o Import/Export no node
yarn sucrase-node src/server.js //para rodar - o node ainda nao reconhece os import/export
criar o arquivo nodemon.json com o execmap para definir o sucrase-node na execucao dos JS ao invés de usar o node
criar o "scripts / dev" no package.json normalmente - ao executar o dev nodemon chamará o sucrase-node

yarn add eslint -D
yarn eslint --init
remover o package-lock.json e executar yarn - eslint intala usando o npm e nos estamos usando o yarn
configurar as rules no arquivo .eslintrc.js

yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
configurar o .eslintrc.js (extends, plugins e rules)
criar o arquivo .prettierrc com as configuracoes que conflitam com o airbnb

yarn eslint --fix src --ext .js //fara a correcao de todos os arquivo .js da pasta src

yarn add sequelize
yarn add sequelize-cli -D
criar o arquivo .sequelizerc
yarn add pg pg-hstore //conforme doc do sequelize para o postgres precisamos instalar essas 2 dependencias
configurar o databaseconfig (src/config/database.js)

yarn sequelize migration:create --name=create-users //cria uma migration usando o sequelize-cli
yarn sequelize db:migrate //roda todas as migracoes
yarn sequelize db:migrate:undo //desfaz a ultima migration
yarn sequelize db:migrate:undo:all //desfaz todas as migrations

yarn add bcryptjs

yarn add jsonwebtoken

yarn add yup //validators - validar entrada de dados na api - usavamos o JOI com o express-validation

yarn add multer //para lidar com upload de arquivo - multipart/form-data
