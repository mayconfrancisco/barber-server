# Barber Server
Backend do App para agendamento em barbearias - Projeto desenvolvido no bootcamp rocketseat

### Para rodar o projeto:

_Sete as configurações da base de dados no arquivo src/config/database.js_

_OPCIONAL: Para criar uma instância do **postgres** com o docker em sua máquina_

**docker run --name database-pg -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres**

_OPCIONAL: Para criar uma instância do **mongo** com o docker em sua máquina_

**docker run --name database-mongo -p 27017:27017 -d -t mongo**

_Para baixar as dependências_

**yarn**

_Para iniciar a aplicação_

**yarn dev**

### Sopinha de Letrinhas

**Sequelize** como ORM do App

**Mongoose** como ODM do App

**express e jsonwebtoken** para lidar com requisições HTTP (Rest + JWT)

**bcryptjs** para hash do password do usuário

**YUP** para lidar com as validações das requisições HTTP

**multer** para lidar com multipart/form-data

**date-fns** api da datas
