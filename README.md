# Barber Server
Backend do App para agendamento em barbearias - Projeto desenvolvido no bootcamp rocketseat

O projeto utiliza um banco de dados relacional (gosto do postgres), um banco de dados NOSQL para as notificações (Mongo) e o Redis para fila de envio de e-mails


### Para rodar o projeto:

_Sete todas as configurações da aplicação em um arquivo .env - há um .env.example para servir de base_

_OPCIONAL: Para criar uma instância do **postgres** com o docker em sua máquina_

**docker run --name database-pg -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres**

_OPCIONAL: Para criar uma instância do **mongo** com o docker em sua máquina_

**docker run --name database-mongo -p 27017:27017 -d -t mongo**

_OPCIONAL: Para criar uma instância do **redis** com o docker em sua máquina_

**docker run --name redis -p 6379:6379 -d -t redis:alpine**

_Para baixar as dependências_

**yarn**

_Para iniciar a aplicação_

**yarn dev**


### Sopinha de Letrinhas

**Sequelize** como ORM do App

**Mongoose** como ODM do App

**express e jsonwebtoken** para lidar com requisições HTTP (Rest + JWT)

**ioredis** para lidar com Redis e realizar _cache_ para algumas consultas na base de dados



**bcryptjs** para hash do password do usuário

**YUP** para lidar com as validações das requisições HTTP

**multer** para lidar com multipart/form-data

**date-fns** api da datas

**nodemailer** para lidar com envio de emails no Node

**handlebarsjs** TemplateEngine para lidar com envio de emails HTML

**bee-queue** para lidar com fila no Node - Alternativa mais performática que o Kue
