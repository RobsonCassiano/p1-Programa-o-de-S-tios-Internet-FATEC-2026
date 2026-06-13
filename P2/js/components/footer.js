export const footer = () => {
    const token = localStorage.getItem('token');
    let user = {};
    
    try {
        const storedUser = localStorage.getItem('user');
        user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : {};
    } catch (e) {
        user = {};
    }

    const isLoggedIn = !!token;

    return `
    <footer>
        <div class="footer-content">
            <p>
                ${isLoggedIn 
                    ? 'Biblioteca BookShop - Programação de Sítios Internet - 2026' 
                    : '<a href="#/admin-register" style="color: inherit; text-decoration: none;">Biblioteca BookShop - Programação de Sítios Internet - 2026</a>'
                }
            </p>
            <div class="footer-socials">
                <a href="https://www.instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                <a href="https://www.twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="https://github.com/RobsonCassiano" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
            </div>
        </div>
    </footer>
`;};