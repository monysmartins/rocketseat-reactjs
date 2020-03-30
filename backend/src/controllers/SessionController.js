//Importar conexão com o banco
const connection = require('../database/connection');
//exportar funções
module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name') //retorna apenas campo nome
            .first();

        if(!ong){
            //Status 400 = algum problema
            return response.status(400).json({ error: 'No ONG found with this ID.'});
        }

        return response.json(ong);

    }
}