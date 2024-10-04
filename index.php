<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link rel="stylesheet" href="style.css"> <!-- Inclua seu arquivo CSS aqui -->
</head>
<body>
    <div class="container">
        <h1>Cadastro de Usuário</h1>
        <form action="gravaPessoa.php" method="POST">
            <label for="username">Nome:</label>
            <input type="text" id="username" name="username" required>

            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" required>

            <label for="celular">Celular:</label>
            <input type="text" id="celular" name="celular" required>

            <label for="age">Idade:</label>
            <input type="number" id="age" name="age" required>

            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Cadastrar</button>
        </form>
    </div>

    <footer>
        <p>&copy; 2024 Cash On. Todos os direitos reservados.</p>
    </footer>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const loginBtn = document.getElementById("loginBtn");
            const registerBtn = document.getElementById("registerBtn");
            const closeLogin = document.getElementById("closeLogin");
            const closeRegister = document.getElementById("closeRegister");
            const drawerLogin = document.getElementById("drawer-login");
            const drawerRegister = document.getElementById("drawer-register");
            const loginForm = document.getElementById("loginForm");
            const registerForm = document.getElementById("registerForm");

            // Abre o drawer de Login
            loginBtn.addEventListener("click", function() {
                drawerLogin.classList.add("active");
            });

            // Abre o drawer de Registro
            registerBtn.addEventListener("click", function() {
                drawerRegister.classList.add("active");
            });

            // Fecha o drawer de Login
            closeLogin.addEventListener("click", function() {
                drawerLogin.classList.remove("active");
            });

            // Fecha o drawer de Registro
            closeRegister.addEventListener("click", function() {
                drawerRegister.classList.remove("active");
            });

            // Fecha o drawer ao clicar fora dele
            window.addEventListener("click", function(event) {
                if (event.target === drawerLogin) {
                    drawerLogin.classList.remove("active");
                }
                if (event.target === drawerRegister) {
                    drawerRegister.classList.remove("active");
                }
            });

            // Função para processar o formulário de login
            loginForm.addEventListener("submit", async function(e) {
                e.preventDefault(); // Previne o envio padrão do formulário

                const formData = new FormData(this);

                try {
                    const response = await fetch('login.php', {
                        method: 'POST',
                        body: formData
                    });
                    const result = await response.text();

                    // Exibe a resposta do servidor
                    alert(result);

                    // Sucesso - redirecionar para dashboard
                    if (result.includes("Login bem-sucedido")) {
                        window.location.href = "dashboard.html";
                    }
                } catch (error) {
                    console.error("Erro ao tentar fazer login:", error);
                }
            });

            // Função para processar o formulário de registro
            registerForm.addEventListener("submit", async function(e) {
                e.preventDefault(); // Previne o envio padrão do formulário

                const formData = new FormData(this);

                try {
                    const response = await fetch('gravaPessoa.php', {
                        method: 'POST',
                        body: formData
                    });
                    const result = await response.text();
                    alert(result); // Exibe a resposta do servidor
                } catch (error) {
                    console.error("Erro ao tentar registrar:", error);
                }
            });
        });
    </script>
</body>
</html>
