# Emprestimo de Jogos

- Projeto para gerenciar os emprestimos dos jogos para os amigos
- Implementação do FontEnd da aplicação
- Esta olhando para o endereço http://localhost:5000/ do BackEnd.

# Comandos Utilizados Para rodar com o docker

- na pasta do projeto que tem o dockerfile, executar os comandos abaixo.
- docker build -t lgfront:v1 .
- docker run -it -p 8000:80 --name loansgames lgfront:v1
- abrir a aplicação em http://localhost:8000

# Comandos Utilizados Para rodar no Windows

- npm install
- ng serve -o