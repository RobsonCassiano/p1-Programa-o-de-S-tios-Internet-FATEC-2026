import { api } from "../api.js";
import { showToast } from "../components/toast.js";

export const registerView = async () => {
    // Lifecycle: executa após o HTML ser injetado no DOM
    setTimeout(() => {
        const form = document.getElementById('registerForm');
        
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome')?.value || "";
            const email = document.getElementById('email')?.value || "";
            const senha = document.getElementById('senha')?.value || "";
            
            // Validação de campos vazios
            if (!nome.trim() || !email.trim() || !senha.trim()) {
                showToast("Por favor, preencha todos os campos para criar seu acesso.", "error");
                return;
            }

            // Enviamos 'editor' para a API (pois é o papel que ela reconhece), 
            // mas para o usuário tratamos como 'cliente'.
            const papel = 'editor'; 
            const btn = form.querySelector('button');

            try {
                btn.disabled = true;
                btn.textContent = 'Processando...';

                const response = await api.post('/cadastrar', { nome, email, senha, papel });
                
                // Realiza o login automático após o sucesso do cadastro
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                showToast(`Bem-vindo, ${response.user.nome}! Acesso criado.`);
                
                // Redireciona para o catálogo ou para a rota salva anteriormente (ex: após clicar em comprar)
                const redirectTo = sessionStorage.getItem('redirectAfterLogin') || '#/books';
                sessionStorage.removeItem('redirectAfterLogin');
                location.hash = redirectTo;
                window.location.reload(); // Recarrega para atualizar a navbar
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Criar Acesso';
            }
        });
    }, 0);

    return `
        <div class="form-container">
            <h1>Criar Acesso</h1>
            <form id="registerForm">
                <label for="nome">Nome Completo</label>
                <input type="text" id="nome" placeholder="Nome Completo" required>
                <label for="email">E-mail</label>
                <input type="email" id="email" placeholder="E-mail" required>
                <label for="senha">Senha</label>
                <input type="password" id="senha" placeholder="Senha" required>
                <button type="submit" class="btn-primary">Criar Acesso</button>
                <p style="margin-top: 1rem; text-align: center;">Já possui conta? <a href="#/login">Entrar</a></p>
            </form>
        </div>`;
};