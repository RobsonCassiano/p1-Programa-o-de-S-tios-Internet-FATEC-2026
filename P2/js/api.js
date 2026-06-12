export const BASE_URL = 'https://base-back-dwpz.onrender.com';

/**
 * Recupera os cabeçalhos padrão, incluindo o token de autenticação se disponível no localStorage.
 */
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

/**
 * Verifica se a resposta indica que o token expirou ou é inválido.
 */
const handleUnauthorized = (response) => {
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        location.hash = '#/';
        window.location.reload();
    }
};

/**
 * Utilitário para lidar com as requisições à API seguindo a documentação fornecida.
 */
export const api = {
    async get(endpoint) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: getHeaders()
        });
        handleUnauthorized(response);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao buscar dados');
        }
        return await response.json();
    },
    
    async post(endpoint, data) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        handleUnauthorized(response);
        if (!response.ok) {
            // Tenta ler o erro detalhado da API, se não conseguir, mostra o status do erro
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: `Erro HTTP: ${response.status} ${response.statusText}` };
            }
            throw new Error(errorData.message || 'Erro ao salvar dados');
        }
        return await response.json();
    },

    async put(endpoint, data) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        handleUnauthorized(response);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao substituir dados');
        }
        return await response.json();
    },

    async patch(endpoint, data) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        handleUnauthorized(response);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao atualizar dados');
        }
        return await response.json();
    },

    async delete(endpoint) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        handleUnauthorized(response);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao excluir dados');
        }
        return response.status === 204 ? null : await response.json();
    }
};