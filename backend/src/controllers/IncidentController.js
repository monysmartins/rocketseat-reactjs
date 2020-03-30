//Importar conexão com o banco
const connection = require('../database/connection');
//exportar funções
module.exports = {
    
    async index(request, response){
        //Config para retorna por paginação
        const { page = 1 } = request.query;
        //pode ser feito count e depois count[0], ou ...
        const [count] = await connection('incidents').count();
        //console.log(count);
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //table condição_valor = condição_valor
            .limit(5)
            .offset((page - 1) * 5) //se 0 imprimi 5 primeiros, depois pula 5 em 5
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
                ]); //[campos desejados]

        //passando o total no cabeçalho
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        //Pegar os valores
        const { title, description, value } = request.body;
        //Pegar o idOng que estará no cabeçalho
        const ong_id = request.headers.authorization;

        //vai retorna um array com uma posição com o valor do id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({id});
    },

    async delete(request, response){
        //id pelo parametro
        const { id } = request.params;
        //ID da ONG
        const ong_id = request.headers.authorization;
        //Confirmar se o caso é mesmo da ONG
        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id') //selecionando apenas uma coluna
            .first(); //Retorna apenas 1 resultado
        
        if (incident.ong_id != ong_id ){
            //retorna o status http erro de negação
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
        //caso não passe pelo if
        await connection('incidents').where('id', id).delete();
        //204 = status de sucesso, mas sem conteudo
        return response.status(204).send();
    }

};