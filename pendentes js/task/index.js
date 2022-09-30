const { default: test } = require('node:test');

const fs = require('fs').promises;          // importar modulo

async function listarArquivosDoDiretorio(diretorio, arquivos) {    // exec funcao

if(!arquivos) 
    arquivos = [];

let listaDeArquivos = await fs.readdir(diretorio);  // ler diretorio
for(let k in listaDeArquivos) {  // loop de arquivos
    let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);  
    if(stat.isDirectory()) {  // se for diretorio
        await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
    arquivos.push(diretorio + '/'[k]); 
    }

    return arquivos;

}

async function test() {
    let arquivos = await listarArquivosDoDiretorio('arquivos');
    console.log(arquivos);
}
}

test();