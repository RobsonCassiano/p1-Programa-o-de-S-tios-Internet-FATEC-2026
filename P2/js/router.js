import { homeView } from "./views/home.js";
import { booksView } from "./views/books.js";
import { detailsView } from "./views/details.js";
import { createView } from "./views/create.js";
import { aboutView } from "./views/about.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { adminRegisterView } from "./views/adminRegister.js"; // Importa a nova view de cadastro de admin
import { navbar } from "./components/navbar.js";
import { breadcrumb } from "./components/breadcrumb.js";
import { footer } from "./components/footer.js";
import { showToast } from "./components/toast.js";

/**
 * Renderiza HTML de forma segura em um container.
 */
const render = (container, html) => {
    const fragment = document.createRange().createContextualFragment(html);
    container.replaceChildren(fragment);
};

export async function router() {
    const app = document.getElementById("app");
    const navContainer = document.getElementById("navbar-container");
    const breadContainer = document.getElementById("breadcrumb-container");
    const footerContainer = document.getElementById("footer-container");

    // Renderiza componentes globais
    render(navContainer, navbar());
    render(breadContainer, breadcrumb());
    render(footerContainer, footer());
    
    const hash = location.hash || "#/";
    const token = localStorage.getItem('token');
    
    // Recuperação segura do usuário para verificar o papel
    let user = {};
    try {
        const storedUser = localStorage.getItem('user');
        user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : {};
    } catch (e) {
        user = {};
    }

    if(hash === "#/"){
        render(app, await homeView());
    }
    else if(hash === "#/books"){
        render(app, await booksView());
    }
    else if(hash === "#/create"){
        if (!token || user.papel !== 'administrador') {
            const msg = !token 
                ? "Acesso negado. Por favor, faça login." 
                : "Acesso restrito a administradores.";
            showToast(msg, "error");
            sessionStorage.setItem('redirectAfterLogin', hash);
            location.hash = "#/login";
            return;
        }
        render(app, await createView());
    }
    else if(hash === "#/login"){
        render(app, await loginView());
    }
    else if(hash === "#/register"){
        render(app, await registerView());
    }
    else if(hash === "#/admin-register"){ // Nova rota para cadastro de administrador
        render(app, await adminRegisterView());
    }
    else if(hash.startsWith("#/edit/")){
        if (!token || user.papel !== 'administrador') {
            const msg = !token 
                ? "Acesso negado. Por favor, faça login." 
                : "Acesso restrito a administradores.";
            showToast(msg, "error");
            sessionStorage.setItem('redirectAfterLogin', hash);
            location.hash = "#/login";
            return;
        }
        const id = hash.split("/")[2];
        render(app, await createView(id));
    }
    else if(hash === "#/about"){
        render(app, await aboutView());
    }
    else if(hash.startsWith("#/book/")){
        const id = hash.split("/")[2];
        render(app, await detailsView(id));
    }
}