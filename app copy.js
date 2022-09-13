//https://www.npmjs.com/package/pdf-creator-node
//https://rcdevlabs.github.io/2015/02/15/upload-de-arquivos-em-api-restfull-nodejs/
//https://medium.com/@renidelonzek/gerando-pdfs-com-flutter-64fc05eb7088

import express from "express";

const app = express();

import pdfToPrinter from 'pdf-to-printer';

const { print } = pdfToPrinter;



//AS DUAS LINHAS À BAIXO SERVEM PARA CONFIGURAR NA ROTA A RECEPÇÃO DO ARQUIVO
import multer from 'multer';
//AQUI EM "orderToPrint" estou definindo para salvar o arquivo na pasta "orderToPrint" que está na raiz do projeto
const upload = multer({ dest: 'orderToPrint', });

//O valor "order"  que está informado em "upload.single('order')"  deve ser o mesmo nome cha chave lá no envio no app:
//Ex:
/*-Parte do código lá no app
  var formData = FormData.fromMap({
        'orderNumber': '#2022',
        'order': await MultipartFile.fromFile(
          file.path,
          filename: 'order',
        )
      });
*/
app.post('/sendPrint', upload.single('order'), (request, response) => {


  const filename = request.file.filename;
  //Aqui estou montando o caminho onde está o arquivo(foi salvo) o arquivo que é recebido pelo EP
  const pathPdf = `C:orderToPrint/${filename}`;

  //Aqui de fato estamos enviando o arquivo para a impressão
  print(pathPdf).then(console.log);

  return response.json({
    message: 'Acesou a ROTA "send-print"'
  });
});

app.get('/getAllPrints', async (request, response) => {

  var printers = pdfToPrinter
    .getPrinters()
    .then(console.log)
    .catch(console.error);

  return response.json({
    message: 'Acesou a ROTA showAllPrints',
    printers: await pdfToPrinter
      .getPrinters(),
  });
});

app.listen(4003, () => console.log('Servidor está rodando na porta 4003'));
