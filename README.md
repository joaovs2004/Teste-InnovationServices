# Teste para desenvolvedor back end jr estágio

O teste consiste no desenvolvimento de um CRUD de uma WEB API, para o
gerenciamento de uma loja entregando os endpoints para realizar listagem, cadastro,
atualização e remoção de produtos.

A API deve ser desenvolvida utilizando Node.js com Typescript, podendo utilizar sua
biblioteca ou framework de preferência.

Para a modelagem do banco de dados, que pode ser o de sua preferência, utilize a
seguinte regra:
* id;
* name;
* category;
* status (ACTIVE, INACTIVE);
* quantity;
* created_at;
* updated_at;
* deleted_at;

Será analisada a qualidade de código, utilização de patterns, validações e tratativas de
erros, boas práticas, organização, nomenclaturas e simplicidade.

EXTRA:

Caso sinta-se confortável, realize a implementação de um endpoint na api que realiza a
consulta dos municípios do Rio de Janeiro, utilizando a API do IBGE e realize a inserção em uma
tabela do seu banco de dados.

Salve apenas id e name, caso o endpoint seja chamado mais de uma vez os itens já
cadastrados não devem ser castrados.

## Pré-requisitos

- Nodejs

## Como rodar

```bash
# Primeiramente clone o projeto
$ git clone https://github.com/joaovs2004/Teste-InnovationServices.git

# Entre na pasta do projeto
$ cd Teste-InnovationServices/

# Instale as dependencias
$ npm install

# Rode o projeto
$ npm run start
```

A API vai rodar na porta 8080

## Sobre

As opções disponiveis na API são:

## Products

Rota   | Metodo |
--------- | ------ |
listAll | GET
listById | GET
paginatedList | GET
add | POST
delete | DELETE
update | PATCH

## Municipalities

Rota   | Metodo |
--------- | ------ |
list | GET
listById | GET

## Como usar

As requisições devem ser feitas para localhost:8080/{Products ou Municipalities}/{rota-desejada}

Rotas que necessitam de id:

Products
* listById
* delete
* update

Municipalities
* listById

As rotas que necessitam de id devem ser usadas da seguinte forma. Exemplo:

localhost:8080/{Products ou Municipalities}/{rota-desejada}/{id}

Na rota de listagem paginada devesse passar a página desejada e o número de items por pagina. Exemplo:

localhost:8080/Products/paginatedList?page=1&itemsPerPage=10

As rotas add e update necessitam de um corpo informando quais valores devem ser adicionados ou modificados
