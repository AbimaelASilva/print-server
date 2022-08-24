const express = require("express");

// Criar uuid
const { randomUUID } = require("crypto");

const app = express();

const products = [];


//O app.user serve para fazer algumas tratativas no meio(middle) da requisição
app.use(express.json());

app.get('/primeira-rota', (request, response) => {

    return response.json({
        message: 'Acesou a primeira rota com nodemon'
    });
});

/**
 * Tipos de envios de dados no requisição para a aplicação (Bd por exemplo):
 * Body => Dados de produto, usuário, etc
 * Params => Vem na url (parâmetros de rota) (obrigatórios)
 * Query => Não são obrigatórios, filtros, paginação, exe: /nome_da_rota?id=2321
 */

//Exemplo de um post com body
app.post('/products', (request, response) => {

    // sabendo as propiedades que vem no request.body, eu posso "desestruturar ele"
    const { name, price } = request.body;

    const product = {
        name, price, id: randomUUID(),
    }

    products.push(product);

    return response.json(product);
});

//Exemplo de um get sem params
app.get('/products', (request, response) => {
    return response.json(products);
});

//Exemplo de um get COM params
app.get('/products/:id', (request, response) => {

    //"desestruturando o response para pegar um paramêttro(neste caso "id") que sei que está nele"
    const { id } = request.params;

    const product = products.find((product)=> products.id === id);
    return response.json(product);
});

