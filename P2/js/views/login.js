import { api } from "../api.js";
import { showToast } from "../components/toast.js";

export const loginView = async () => {
    // Lifecycle: executa após o HTML ser injetado no DOM
    setTimeout(() => {
        const form = document.getElementById('loginForm');
        
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const btn = form.querySelector('button');

            try {
                btn.disabled = true;
                btn.textContent = 'Autenticando...';

                const response = await api.post('/entrar', { email, senha });
                
                // Armazena o token e os dados do usuário
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                showToast(`Bem-vindo, ${response.user.nome}!`);
                
                // Verifica se há uma rota salva para redirecionamento
                const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '#/books';
                sessionStorage.removeItem('redirectAfterLogin');
                location.hash = redirectTo;
                window.location.reload(); // Força a atualização da navbar
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Entrar';
            }
        });
    }, 0);

    return `
        <div class="form-container">
            <h1>Login</h1>
            <form id="loginForm">
                <label for="email">E-mail</label>
                <input type="email" id="email" placeholder="Seu e-mail" required>
                <label for="senha">Senha</label>
                <input type="password" id="senha" placeholder="Sua senha" required>
                <button type="submit" class="btn-primary">Entrar</button>
            </form>
        </div>`;
};