# 🚀 Projeto Front-End – Consumo de API com JavaScript

## Nome: Robson Cassiano

Este projeto foi desenvolvido como parte da disciplina de **Programação de Sítios Internet** - FATEC.

## 🎯 Objetivo

Criar uma aplicação web utilizando **JavaScript puro (Vanilla JS)** para consumir dados de uma **API pública**, exibindo os resultados de forma dinâmica em uma interface amigável.

---

## 💡 Funcionalidades

- Campo de busca por nome
- Consumo de API com `fetch()`
- Exibição de resultados em formato de cards
- Manipulação do DOM
- Tratamento de erros
- Interface organizada e responsiva

---

## 🛠️ Tecnologias Utilizadas

- HTML
- CSS
- JavaScript (Vanilla JS)

---

## 🔗 Acesse o Projeto

- 💻 GitHub: (https://github.com/RobsonCassiano)
- 🌐 GitHub Pages: (https://robsoncassiano.github.io/p1-Programa-o-de-S-tios-Internet-FATEC-2026/)

---

## 📚 Sobre o Projeto

A aplicação permite buscar personagens em uma API pública e exibir suas informações de forma dinâmica, reforçando conceitos fundamentais de desenvolvimento front-end como:

- Requisições HTTP
- Manipulação de elementos HTML via JavaScript
- Interatividade com o usuário

---

## 📸 Preview

![](./preview.png)

---

## 📢 Post no LinkedIn

Confira a publicação sobre este projeto:

👉 [www.linkedin.com/in/robson-cassiano-b6a44195]

---
Critérios

Foi criado o campo de busca? (0,5)
Inserido searchInput e searchBtn que está capturando o evento de submit do formulário.

Os cards são criados dinamicamente? (1,5)
Criei uma função CardComponent e cloneNode, para o site ficar dinâmico.

Os cards são criados dependendo da busca? (1,5)
O fetchCharacters(currentName, currentPage) utiliza o valor capturado no input para filtrar os resultados da API. Adicionei 3 botoes de sugestão para ficar intuitivo para o usuário.


Foi utilizado métodos para criar os novos elementos HTML? (1,5) 
Utilizado template.content.cloneNode(true) para a estrutura e container.appendChild(card) para inserir no DOM (container.replaceChildren() para limpar a lista).

O consumo de API foi feito usando o fetch()? (1,5)
O código utiliza await fetch(...) assíncrona.

Incluiu tratamento de erro no campo de busca? (0,5)
Implementado um bloco try catch para verificar se a resposta é res.ok e trata o caso de "Nenhum resultado" quando a lista volta vazia.

Está responsivo? (1,0)
Nao tive aula relacionada a responsividade portanto nao posso confirmar.

Foi criado o README com informações do projeto? (1,0)

Projeto montado conforme informacoes do README.md, Fonte utilizada:waltograph.regular. Link da API:(https://disneyapi.dev/) / https://disneyapi.dev/docs/

Foi habilitado o github Pages? (0,5)
O link está no README.

Foi publicado no linkedIn? (0,5)
Sim - https://www.linkedin.com/in/robson-cassiano-b6a44195
 ---

## 👨‍🏫 Disciplina

**Programação de Sítios Internet**  
Prof. Fernando Leonid – 2026

---
