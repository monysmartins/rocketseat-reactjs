const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//const crypto = require('crypto');

//const connection = require('./database/connection');

const routes = express.Router();


//app.use(express.json()); //Transformar o JSON em algo entendido pela aplicação.
//asyn = Assincrona, await = aguardar até finalizar

//Rota para visualizar as ONGs
/*routes.get('/ongs', async (request, response) => {
   const ongs = await connection('ongs').select('*');

    return response.json(ongs);
} );
*/ 
//substituindo o método acima
routes.get('/ongs', OngController.index);

//Criando uma Sessão
routes.post('/sessions', SessionController.create);



//Cadastro de ONG
routes.post('/ongs', OngController.create);

//Lista Incident = Casos
routes.get('/incidents', IncidentController.index);
//Cadastro Incident = Caso
routes.post('/incidents', IncidentController.create);

//deletar incidente
routes.delete('/incidents/:id', IncidentController.delete);

//Buscando pelo Incidentes da ONG
routes.get('/profile', ProfileController.index);

//Para exportar as rotas
module.exports = routes;

