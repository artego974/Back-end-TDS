document.addEventListener("DOMContentLoaded", () => {
    const btnSalvar = document.querySelector("button[type='submit']");
    const nomeInput = document.getElementById("name");
    const precoInput = document.getElementById("preco");
    const qtndInput = document.getElementById("qtnd");
    const formTitle = document.getElementById("form-title");
    const cardsContainer = document.getElementById("cards-container");

    const API_URL = "http://localhost:3000/prod";
    let editandoId = null; // 🔥 controla se está editando ou criando

    function criarCard(produto) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = produto.id;

        card.innerHTML = `
            <h3>${produto.name}</h3>
            <p>Preço: R$ ${parseFloat(produto.preco).toFixed(2)}</p>
            <p>Quantidade: ${produto.qtnd}</p>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        `;

        const btnExcluir = card.querySelector(".delete-btn");
        btnExcluir.addEventListener("click", () => excluirProduto(produto.id, card));

        const btnEditar = card.querySelector(".edit-btn");
        btnEditar.addEventListener("click", () => editarProduto(produto));

        cardsContainer.appendChild(card);
    }

    async function carregarProdutos() {
        try {
            const response = await fetch(API_URL);
            const produtos = await response.json();
            produtos.forEach(prod => criarCard(prod));
        } catch (err) {
            console.error("Erro ao carregar produtos", err);
            alert("Erro ao carregar produtos.");
        }
    }

    // 📝 Preenche os campos para edição
    function editarProduto(produto) {
        nomeInput.value = produto.name;
        precoInput.value = produto.preco;
        qtndInput.value = produto.qtnd;
        formTitle.textContent = "Editar Produto";
        editandoId = produto.id; // 🔥 marca que está editando
    }

    btnSalvar.addEventListener("click", async () => {
        const nome = nomeInput.value.trim();
        const preco = precoInput.value.trim();
        const qtnd = qtndInput.value.trim();

        if (!nome || !preco || !qtnd) {
            alert("Preencha todos os campos!");
            return;
        }

        const dados = {
            name: nome,
            preco: parseFloat(preco),
            qtnd: parseInt(qtnd)
        };

        try {
            if (editandoId) {
                // ✏️ Atualizar produto existente (PUT)
                const response = await fetch(`${API_URL}/${editandoId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dados)
                });

                if (!response.ok) throw new Error("Erro ao atualizar");

                // Atualiza visualmente
                atualizarCardNaTela(editandoId, dados);

                alert("Produto atualizado!");
            } else {
                // ✅ Criar novo produto (POST)
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dados)
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message);

                criarCard(data.prod);
                alert("Produto criado!");
            }

            // 🔄 Resetar formulário
            nomeInput.value = "";
            precoInput.value = "";
            qtndInput.value = "";
            formTitle.textContent = "Adicionar Produto";
            editandoId = null;

        } catch (error) {
            console.error("Erro ao salvar/editar produto:", error);
            alert("Erro ao salvar produto.");
        }
    });

    function atualizarCardNaTela(id, dados) {
        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (card) {
            card.querySelector("h3").textContent = dados.name;
            card.querySelector("p:nth-of-type(1)").textContent = `Preço: R$ ${parseFloat(dados.preco).toFixed(2)}`;
            card.querySelector("p:nth-of-type(2)").textContent = `Quantidade: ${dados.qtnd}`;
        }
    }

    async function excluirProduto(id, cardElement) {
        if (!confirm("Excluir este produto?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (response.status === 204) {
                cardElement.remove();
                alert("Produto excluído.");
            } else {
                alert("Erro ao excluir produto.");
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir produto.");
        }
    }

    carregarProdutos();
});
