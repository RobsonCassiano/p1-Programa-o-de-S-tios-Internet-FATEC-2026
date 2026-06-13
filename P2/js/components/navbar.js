export const navbar = () => {
    const token = localStorage.getItem('token');
    
    // Recuperação segura do usuário para evitar erros de "null" ou "undefined"
    let user = {};
    try {
        const storedUser = localStorage.getItem('user');
        user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : {};
    } catch (e) {
        user = {};
    }

    // Lógica de logout exposta globalmente para os links do nav
    window.handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        location.hash = '#/';
        window.location.reload(); // Garante que a UI seja reconstruída
    };

    // Define o ícone e a cor baseada no papel do usuário
    const isAdmin = token && user.papel === 'administrador';
    const roleIcon = isAdmin ? 'fa-user-shield' : 'fa-user';
    const iconColor = isAdmin ? '#f1c40f' : '#3498db'; // Amarelo/Dourado vs Azul

    return `
    <header>
        <a href="#/" class="logo">
            <img src="./assets/logo.png" alt="Logo da Biblioteca Digital">
        </a>
        <nav>
            <a href="#/">Início</a>
            <a href="#/books">Catálogo</a>
            ${isAdmin ? `<a href="#/create">Cadastrar</a>` : ''}
            <a href="#/about">Sobre</a>
            ${token && user?.nome
                ? `<span style="display: inline-flex; align-items: center; margin-left: 20px;">
                    <i class="fas ${roleIcon}" style="color: ${iconColor}; margin-right: 5px;" title="${isAdmin ? 'Administrador' : 'Cliente'}"></i>
                    <a href="javascript:handleLogout()" style="margin-left: 0;">Sair (${user.nome})</a>
                   </span>` 
                : `<a href="#/login">Entrar</a><a href="#/register">Criar Acesso</a>`
            }
        </nav>
    </header>
`;
};