const express = require('express'); //import da biblioteca
//importa modulo segurança
const cors = require('cors');


//importar as rotas './' identifica como arquivo
const routes = require('./routes');

const app = express(); //aplicação que terá todas as rotas e ...

app.use(cors());
app.use(express.json()); //Transformar o JSON em algo entendido pela aplicação.
app.use(routes);


app.listen(3333); //executando na porta 3333 -> node index.js para run

