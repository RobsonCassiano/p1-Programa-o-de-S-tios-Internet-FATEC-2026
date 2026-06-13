import { api } from "../api.js";
import { showToast } from "../components/toast.js";

const render = (container, html) => {
    container.replaceChildren(document.createRange().createContextualFragment(html));
};

export const booksView = async () => {
    const renderBooks = (books) => {
        const grid = document.getElementById('booksGrid');
        if (!grid) return;
        
        if (books.length === 0) {
            render(grid, '<p class="no-results">Nenhum livro encontrado.</p>');
            return;
        }

        const html = books.map(book => `
            <div class="card">
                <img src="${book.imagemUrl || 'https://placehold.co/200x300'}" alt="${book.nome}">
                <div class="card-content">
                    <h3>${book.nome}</h3>
                    <p>${book.descricao?.substring(0, 60)}...</p>
                    <p class="price">R$ ${book.preco.toFixed(2)}</p>
                    <a href="#/book/${book.id}" class="btn">Ver Detalhes</a>
                </div>
            </div>
        `).join('');
        render(grid, html);
    };

    // Executa após o router injetar o HTML para configurar eventos e carregar dados iniciais
    setTimeout(async () => {
        const searchInput = document.getElementById('bookSearch');
        const loading = document.getElementById('loading');
        
        try {
            searchInput?.addEventListener('input', async (e) => {
                const query = e.target.value;
                const filteredBooks = await api.get(`/produtos?q=${query}&ativo=true`);
                renderBooks(filteredBooks);
            });

            const books = await api.get('/produtos?ativo=true');
            renderBooks(books);
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            loading?.classList.add('hidden');
        }
    }, 0);

    return `
        <div class="view-header">
            <h2>Catálogo de Livros</h2>
            <label for="bookSearch" class="sr-only">Buscar livros no catálogo</label>
            <input type="search" id="bookSearch" placeholder="Busca em tempo real...">
        </div>
        <div id="loading" class="loading-spinner">Carregando...</div>
        <div class="books-grid" id="booksGrid"></div>
    `;
};