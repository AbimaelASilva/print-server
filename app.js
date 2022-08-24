//https://www.npmjs.com/package/pdf-creator-node


import express from "express";
//import { createRequire } from "module";
//const require = createRequire(import.meta.url);


const app = express();


import pkg from 'pdf-to-printer';
const { print } = pkg;
import { create } from 'pdf-creator-node';
import { readFileSync } from 'fs';
const html = readFileSync('public/template.html', 'utf-8');



app.get('/sendPrint', (request, response) => {

    const options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Abimael Andrade</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

    const users = [
        {
            name: 'Rozana',
            age: 21
        },
        {
            name: 'Suzana',
            age: 10
        },
        {
            name: 'Gato Miu',
            age: 2
        },
    ];

    const document = {
        html: html,
        data: {
            users: users
        },
        path: './listaDeUsuarios.pdf',
        type: '',
    }

    create(document, options).then((response) => {

        console.log(response);

        print("./listaDeUsuarios.pdf").then(console.log);


    }).catch((error) => console.log(error));

    return response.json({
        message: 'Acesou a ROTA "send-print"'
    });
});

app.listen(4003, () => console.log('Servidor está rodando na porta 4003'));


