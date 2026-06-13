# 📚 Biblioteca BookShop - SPA

Projeto de Single Page Application (SPA) desenvolvido para a disciplina de **Programação de Sítios Internet (2026)** sob orientação do Prof. Fernando Leonid.

## Descrição do projeto

O Biblioteca BookShop é um sistema de gerenciamento de acervo literário que permite a interação entre visitantes e administradores. O projeto foi construído utilizando JavaScript Vanilla (ES6+), sem a dependência de frameworks, focando em uma arquitetura modular, limpa e de alta performance.

## Objetivo

O objetivo central foi criar um gerenciador de biblioteca moderno, fluido e intuitivo, oferecendo uma experiência de navegação sem recarregamentos de página, permitindo que visitantes explorem o catálogo e administradores façam a gestão completa do acervo."

## Tecnologias

- **HTML5 & CSS3**: Estrutura e estilização moderna com foco em Flexbox e Grid.
- **JavaScript (Vanilla)**: Lógica pura, sem frameworks, utilizando módulos (ES6).
- **API REST**: Integração completa com backend hospedado no Render.
- **Font Awesome**: Ícones para redes sociais e interface (somente footer).

## Funcionalidades

- **Navegação SPA**: Sistema de rotas via Hash (#/) sem recarregamento de página.
- **CRUD Completo**: Cadastro, listagem, edição e exclusão de livros (Produtos).
- **Busca em Tempo Real**: Filtro dinâmico no catálogo consumindo a API.
- **Sistema de Autenticação**: Login e Cadastro de administradores/editores com persistência via JWT.
- **Acessibilidade (a11y)**: Conformidade com WCAG, uso de labels, `sr-only` e atributos ARIA.
- **Feedback Visual**: Notificações via Toast (sucesso/erro) e indicadores de carregamento (Loading).
- **Responsividade**: Design adaptável para desktop, tablets e smartphones.
- **Breadcrumb**: Caminho de navegação dinâmico para melhor UX.

## Contrato da API

A aplicação consome uma API REST no endereço: `https://base-back-dwpz.onrender.com`

### Autenticação

| Método | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| POST | `/entrar` | Realiza login do usuário | Não |
| POST | `/cadastrar` | Cria um novo usuário (Cliente/Admin) | Não |

**Estrutura de Login:** `{ "email": "...", "senha": "..." }`  
**Resposta de Sucesso:** `{ "accessToken": "...", "user": { "id": 1, "nome": "...", "email": "...", "papel": "..." } }`

### Produtos (Livros)

| Método | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| GET | `/produtos` | Lista todos os livros ativos | Não |
| GET | `/produtos/:id` | Detalhes de um livro específico | Não |
| POST | `/produtos` | Cadastra um novo livro | Sim (Admin) |
| PUT | `/produtos/:id` | Atualiza os dados de um livro | Sim (Admin) |
| DELETE | `/produtos/:id` | Remove um livro do acervo | Sim (Admin) |

**Parâmetros de Busca (GET /produtos):**
- `q`: Termo de busca para filtro em tempo real.
- `ativo`: Filtra apenas produtos ativos (`true`).

### Esquemas de Dados

**Produto (JSON):**
```json
{
  "nome": "String",
  "descricao": "String",
  "preco": "Number (Float)",
  "imagemUrl": "String (Base64 ou URL)",
  "categoriaId": 1,
  "ativo": true
}
```

**Usuário (JSON):**
```json
{
  "nome": "String",
  "email": "String",
  "senha": "String",
  "papel": "administrador | editor"
}
```

## Arquitetura do Projeto

```text
P2/
├── css/            # Módulos de estilo (Header, Cards, Forms, etc.)
├── js/
│   ├── components/ # Componentes reutilizáveis (Navbar, Footer, Toast)
│   ├── views/      # Telas principais da aplicação
│   ├── api.js      # Serviço de comunicação com o backend
│   ├── router.js   # Gerenciador de rotas da SPA
│   └── app.js      # Ponto de entrada da aplicação
├── assets/         # Imagens e ícones
└── index.html      # Arquivo principal
```

## Como executar

1. Clone o repositório.
2. Utilize a extensão **Live Server** no VS Code para rodar o projeto (porta padrão: 5501).
3. Acesse `http://127.0.0.1:5501/index.html` no seu navegador.

## Deploy

GitHub Pages: []

## Video Pitch

Link: [https://youtu.be/5VH3aV8C3Tc]

## Repositório público no GitHub

Link: [https://github.com/fernandoleonid/FATEC-atividades-Programa-o-de-S-tios-Internet-1-2026/issues/26#issue-4584736779]

## LinKedIn

Link: [https://www.linkedin.com/posts/robson-cassiano-b6a44195_robson-cassiano-p2-issue-26-fernandoleonid-share-7471349394819432448-GBey/?utm_source=share&utm_medium=member_desktop&rcm=ACoAABQtEUIB0pAJj2DHB6qA-kWbV7gqgkmX7I0]

## Autor

**Robson Cassiano**





