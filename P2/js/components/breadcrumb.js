export const breadcrumb = () => {
    const routeLabels = {
        "books": "Catálogo",
        "book": "Detalhes",
        "create": "Novo Livro",
        "edit": "Editar",
        "login": "Entrar",
        "register": "Criar Acesso",
        "admin-register": "Admin",
        "about": "Sobre"
    };

    const hash = location.hash || "#/";
    const paths = hash.split('/').filter(p => p && p !== '#');
    
    // Se não houver sub-caminhos (estiver na Página Inicial), retorna vazio para ocultar o breadcrumb
    if (paths.length === 0) return "";

    let html = `<div class="breadcrumb"><a href="#/">Início</a>`;
    
    paths.forEach((path, index) => {
        const label = routeLabels[path] || path;
        const url = `#/${paths.slice(0, index + 1).join('/')}`;
        html += `<span> / </span><a href="${url}">${label}</a>`;
    });

    html += `</div>`;
    return html;
};