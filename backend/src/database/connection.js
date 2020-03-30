const knex = require('knex');
const configuration = require('../../knexfile');
//conexão devepment
const connection = knex(configuration.development);

//exportar a conexão
module.exports = connection;

