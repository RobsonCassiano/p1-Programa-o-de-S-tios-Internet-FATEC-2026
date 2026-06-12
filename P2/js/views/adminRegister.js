import { api } from "../api.js";
import { showToast } from "../components/toast.js";

export const adminRegisterView = async () => {
    // Lifecycle: executa após o HTML ser injetado no DOM
    setTimeout(() => {
        const form = document.getElementById('adminRegisterForm');
        
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            // Validação de campos vazios para Admin
            if (!nome.trim() || !email.trim() || !senha.trim()) {
                showToast("Todos os campos são obrigatórios para o cadastro de administrador.", "error");
                return;
            }

            // O papel é fixado como 'administrador' para esta rota
            const papel = 'administrador'; 
            const btn = form.querySelector('button');

            try {
                btn.disabled = true;
                btn.textContent = 'Processando...';

                const response = await api.post('/cadastrar', { nome, email, senha, papel });
                
                // Realiza o login automático após o sucesso do cadastro
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                showToast(`Conta de administrador criada com sucesso!`);
                location.hash = '#/'; // Redireciona para a home
                window.location.reload();
            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Criar Conta Admin';
            }
        });
    }, 0);

    return `
        <div class="form-container">
            <h1>Cadastro de Administrador</h1>
            <form id="adminRegisterForm">
                <label for="nome">Nome Completo</label>
                <input type="text" id="nome" placeholder="Nome Completo" required>
                <label for="email">E-mail</label>
                <input type="email" id="email" placeholder="E-mail" required>
                <label for="senha">Senha</label>
                <input type="password" id="senha" placeholder="Senha" required>
                <button type="submit" class="btn-primary">Criar Conta Admin</button>
                <p style="margin-top: 1rem; text-align: center;">Já possui conta? <a href="#/login">Entrar</a></p>
            </form>
        </div>`;
};