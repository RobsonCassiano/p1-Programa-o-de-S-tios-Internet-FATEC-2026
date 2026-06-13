import { api } from "../api.js";
import { showToast } from "../components/toast.js";

const render = (container, html) => {
    container.replaceChildren(document.createRange().createContextualFragment(html));
};

export const detailsView = async (id) => {
    const token = localStorage.getItem('token');
    
    let user = {};
    try {
        const storedUser = localStorage.getItem('user');
        user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : {};
    } catch (e) {
        user = {};
    }


    // Busca os dados após renderizar o container inicial
    setTimeout(async () => {
        const container = document.getElementById('detailsContent');

        try {
            const book = await api.get(`/produtos/${id}`);
            
            render(container, `
                <div class="product-details-wrapper">
                    <div class="product-image"> <img src="${book.imagemUrl}" alt="${book.nome}"> </div>
                    <div class="product-info">
                        <h1>${book.nome}</h1>
                        <span class="badge">ID: ${book.id}</span>
                        <p class="price">R$ ${book.preco.toFixed(2)}</p>
                        <p class="description">${book.descricao || 'Sem descrição disponível.'}</p>
                        <div class="actions">
                            <button id="btnBuy" class="btn-primary">Comprar Agora</button>
                            ${token && user.papel === 'administrador' ? `
                                <a href="#/edit/${book.id}" class="btn-warning">Editar Livro</a>
                                <button id="btnDelete" class="btn-danger">Excluir Livro</button>
                            ` : ''}
                            <a href="#/books" class="btn-secondary">Voltar ao Catálogo</a>
                        </div>
                    </div>
                </div>
            `);

            // Lógica de compra
            document.getElementById('btnBuy')?.addEventListener('click', () => {
                if (!token) {
                    showToast("Você precisa estar logado para comprar. Redirecionando para Criar Acesso...", "warning");
                    sessionStorage.setItem('redirectAfterLogin', `#/book/${id}`);
                    location.hash = "#/register";
                } else {
                    showToast(`Livro "${book.nome}" adicionado ao carrinho!`);
                }
            });

            // Lógica de exclusão
            document.getElementById('btnDelete')?.addEventListener('click', async () => {
                if (confirm(`Tem certeza que deseja excluir o livro "${book.nome}"?`)) {
                    try {
                        await api.delete(`/produtos/${id}`);
                        showToast("Livro excluído com sucesso!");
                        location.hash = "#/books"; // Redireciona para o catálogo
                    } catch (error) {
                        showToast("Erro ao excluir: " + error.message, "error");
                    }
                }
            });
        } catch (error) {
            showToast("Erro ao carregar o livro: " + error.message, 'error');
            render(container, `<div class="error-msg">Livro não encontrado ou erro na API.</div>`);
        }
    }, 0);

    return `
        <div class="details-container" id="detailsContent">
            <div class="loading-spinner">Carregando detalhes do produto...</div>
        </div>`;
};