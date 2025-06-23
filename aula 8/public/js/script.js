document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const response = await fetch('http://localhost:3000/api/usersLogin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: senha })
                });

                const data = await response.json();

                if (response.status === 200) {
                    alert(data.message);
                    window.location.href = 'home.html';
                } else if (response.status === 404) {
                    alert('Usuário não encontrado');
                } else if (response.status === 401) {
                    alert('Senha inválida');
                } else {
                    alert('Erro desconhecido no login');
                }

            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Erro na conexão com o servidor.');
            }
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: nome, email: email, password: senha })
                });

                const data = await response.json();

                if (response.status === 201) {
                    alert(data.message);
                    window.location.href = 'login.html';
                } else if (response.status === 400) {
                    alert('Preencha todos os campos corretamente.');
                } else {
                    alert('Erro desconhecido no cadastro.');
                }

            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Erro na conexão com o servidor.');
            }
        });
    }
});
