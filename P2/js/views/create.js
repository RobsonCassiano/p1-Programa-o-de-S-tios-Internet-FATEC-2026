import { api } from "../api.js";
import { showToast } from "../components/toast.js";

export const createView = async (id = null) => {
    const isEdit = id !== null;

    // Lifecycle: executa após o HTML ser injetado no DOM
    setTimeout(async () => {
        const form = document.getElementById('bookForm');
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const previewImg = document.getElementById('imagemPreview');
        const btnRemoveImage = document.getElementById('btnRemoveImage');
        let initialData = { nome: '', descricao: '', preco: '', imagemUrl: '' };
        let base64Image = '';

        // Se for edição, busca os dados existentes
        if (isEdit) {
            try {
                const book = await api.get(`/produtos/${id}`);
                document.getElementById('nome').value = book.nome;
                document.getElementById('descricao').value = book.descricao;
                document.getElementById('preco').value = book.preco;
                base64Image = book.imagemUrl || '';

                initialData = {
                    nome: book.nome || '',
                    descricao: book.descricao || '',
                    preco: book.preco ? book.preco.toString() : '',
                    imagemUrl: base64Image
                };

                if (base64Image) {
                    previewImg.src = base64Image;
                    previewImg.classList.remove('hidden');
                    btnRemoveImage.classList.remove('hidden');
                    dropZone.querySelector('p').textContent = "Imagem carregada";
                }
            } catch (error) {
                showToast("Erro ao carregar dados para edição", "error");
            }
        }

        // 2. Funções auxiliares para Arquivos
        const handleFile = (file) => {
            const MAX_SIZE_MB = 2;
            const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

            if (!file.type.startsWith('image/')) {
                showToast("Por favor, selecione um arquivo de imagem válido.", "error");
                return;
            }

            if (file.size > MAX_SIZE_BYTES) {
                showToast(`A imagem é muito grande. O limite máximo é de ${MAX_SIZE_MB}MB.`, "error");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                base64Image = e.target.result;
                previewImg.src = base64Image;
                previewImg.classList.remove('hidden');
                btnRemoveImage.classList.remove('hidden');
                dropZone.querySelector('p').textContent = "Imagem selecionada!";
            };
            reader.readAsDataURL(file);
        };

        // 3. Eventos de Drag & Drop e Seleção
        dropZone?.addEventListener('click', () => fileInput.click());
        
        fileInput?.addEventListener('change', (e) => {
            if (e.target.files.length > 0) handleFile(e.target.files[0]);
        });

        // Evento para remover a imagem
        btnRemoveImage?.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique dispare o dropZone
            base64Image = '';
            previewImg.src = '';
            previewImg.classList.add('hidden');
            btnRemoveImage.classList.add('hidden');
            fileInput.value = '';
            dropZone.querySelector('p').textContent = "Arraste a imagem aqui ou clique para selecionar";
        });

        ['dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone?.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (eventName === 'dragover') dropZone.classList.add('dragover');
                if (eventName === 'dragleave' || eventName === 'drop') dropZone.classList.remove('dragover');
                if (eventName === 'drop' && e.dataTransfer.files.length > 0) {
                    handleFile(e.dataTransfer.files[0]);
                }
            });
        });

        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const precoValue = parseFloat(document.getElementById('preco').value);

            if (isNaN(precoValue)) {
                showToast("Por favor, insira um preço válido.", "error");
                return;
            }

            try {
                btn.disabled = true;
                btn.textContent = 'Enviando...';

                const payload = {
                    nome: document.getElementById('nome').value,
                    descricao: document.getElementById('descricao').value,
                    preco: precoValue,
                    imagemUrl: base64Image || 'https://placehold.co/400x600?text=Sem+Capa',
                    categoriaId: 1, 
                    ativo: true
                };

                // 3. Salva ou Atualiza no backend
                if (isEdit) {
                    await api.put(`/produtos/${id}`, payload);
                    showToast('Livro atualizado com sucesso!');
                } else {
                    await api.post('/produtos', payload);
                    showToast('Livro cadastrado com sucesso!');
                }

                location.hash = '#/books'; // Redireciona para o catálogo

            } catch (error) {
                showToast(error.message, 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Salvar Livro';
            }
        });

        // Lógica de Confirmação ao Cancelar
        form?.querySelector('.btn-secondary')?.addEventListener('click', (e) => {
            const hasChanges = document.getElementById('nome').value !== initialData.nome ||
                               document.getElementById('descricao').value !== initialData.descricao ||
                               document.getElementById('preco').value !== initialData.preco ||
                               base64Image !== initialData.imagemUrl;

            if (hasChanges && !confirm("Você tem alterações não salvas. Deseja realmente sair?")) {
                e.preventDefault();
            }
        });
    }, 0);

    return `
        <style>
            .drop-zone {
                border: 2px dashed #cbd5e1;
                border-radius: 8px;
                padding: 40px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                background: #f1f5f9;
                margin-bottom: 1rem;
            }
            .drop-zone.dragover {
                border-color: var(--primary);
                background: #e0e7ff;
            }
            .imagem-preview {
                max-width: 200px;
                margin-top: 15px;
                border-radius: 4px;
            }
            .preview-wrapper {
                position: relative;
                display: inline-block;
                margin-top: 15px;
            }
            .btn-remove {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ef4444;
                color: white;
                border: none;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
        </style>
        <div class="form-container">
            <h1>${isEdit ? 'Editar Livro' : 'Cadastrar Novo Livro'}</h1>
            <form id="bookForm">
                <label for="nome">Título do Livro</label>
                <input type="text" id="nome" placeholder="Título do Livro" required>
                <label for="descricao">Descrição</label>
                <textarea id="descricao" placeholder="Descrição"></textarea>
                <label for="preco">Preço (R$)</label>
                <input type="number" id="preco" placeholder="Preço" step="0.01" required>
                
                <label>Capa do Livro</label>
                <div id="dropZone" class="drop-zone">
                    <p>Arraste a imagem aqui ou clique para selecionar</p>
                    <input type="file" id="fileInput" accept="image/*" class="hidden">
                    <div class="preview-wrapper">
                        <img id="imagemPreview" class="imagem-preview hidden" alt="Prévia da capa">
                        <button type="button" id="btnRemoveImage" class="btn-remove hidden" title="Remover imagem">&times;</button>
                    </div>
                </div>

                <div class="actions">
                    <button type="submit" class="btn-primary">Salvar Livro</button>
                    <a href="#/books" class="btn-secondary">Cancelar</a>
                </div>
            </form>
        </div>`;
};