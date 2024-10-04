<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro e Login - Cash On</title>
    <link rel="stylesheet" href="estilo.css">
</head>

<body>
    <header>
        <h1>Cash On</h1>
        <img src="https://images.emojiterra.com/google/noto-emoji/animated-emoji/1f911.gif" alt="Emoji de Dinheiro" style="width: 30px; vertical-align: middle;">
    </header>

    <main>
        <div class="container">
            <h2>Seja Bem-Vindo!</h2>
            <div class="button-container">
                <button id="registerBtn" aria-label="Abrir formulário de registro">Registrar</button>
                <button id="loginBtn" aria-label="Abrir formulário de login">Login</button>
            </div>
        </div>
    </main>

    <!-- Drawer de Registro -->
    <div id="drawer-register" class="drawer">
        <div class="drawer-content">
            <span class="close-btn" id="closeRegister" aria-label="Fechar formulário de registro">&times;</span>
            <h2>Registrar</h2>
            <form id="registerForm">
                <fieldset>
                    <legend>Preencha seus dados</legend>

                    <label for="registerUsername">Nome de Usuário:</label>
                    <input type="text" id="registerUsername" name="username" required>

                    <label for="registerCpf">CPF:</label>
                    <input type="text" id="registerCpf" name="cpf" required pattern="\d{11}" title="O CPF deve conter 11 dígitos.">

                    <label for="registerCelular">Celular:</label>
                    <input type="text" id="registerCelular" name="celular" required>

                    <label for="registerAge">Idade:</label>
                    <input type="number" id="registerAge" name="age" required min="18" max="120">

                    <label for="registerPassword">Senha:</label>
                    <input type="password" id="registerPassword" name="password" required>

                    <label for="registerConfirmPassword">Repetir Senha:</label>
                    <input type="password" id="registerConfirmPassword" name="confirmPassword" required>

                    <button type="submit">Registrar</button>
                </fieldset>
            </form>
        </div>
    </div>

    <!-- Drawer de Login -->
    <div id="drawer-login" class="drawer">
        <div class="drawer-content">
            <span class="close-btn" id="closeLogin" aria-label="Fechar formulário de login">&times;</span>
            <h2>Login</h2>
            <form id="loginForm">
                <label for="loginCpf">CPF:</label>
                <input type="text" id="loginCpf" name="cpf" required pattern="\d{11}" title="O CPF deve conter 11 dígitos.">

                <label for="loginPassword">Senha:</label>
                <input type="password" id="loginPassword" name="password" required>

                <button type="submit">Login</button>
            </form>
        </div>
    </div>

    <footer>
        <p>&copy; 2024 Cash On. Todos os direitos reservados.</p>
    </footer>

    <script>
    document.addEventListener("DOMContentLoaded", function () {
        const registerBtn = document.getElementById("registerBtn");
        const closeRegister = document.getElementById("closeRegister");
        const drawerRegister = document.getElementById("drawer-register");
        const loginBtn = document.getElementById("loginBtn");
        const closeLogin = document.getElementById("closeLogin");
        const drawerLogin = document.getElementById("drawer-login");
        const registerForm = document.getElementById("registerForm");
        const loginForm = document.getElementById("loginForm");

        // Abre o drawer de Registro
        registerBtn.addEventListener("click", function () {
            drawerRegister.classList.add("active");
        });

        // Fecha o drawer de Registro
        closeRegister.addEventListener("click", function () {
            drawerRegister.classList.remove("active");
        });

        // Abre o drawer de Login
        loginBtn.addEventListener("click", function () {
            drawerLogin.classList.add("active");
        });

        // Fecha o drawer de Login
        closeLogin.addEventListener("click", function () {
            drawerLogin.classList.remove("active");
        });

        // Fecha o drawer ao clicar fora dele
        window.addEventListener("click", function (event) {
            if (event.target === drawerRegister) {
                drawerRegister.classList.remove("active");
            } else if (event.target === drawerLogin) {
                drawerLogin.classList.remove("active");
            }
        });

        // Previne o envio do formulário de registro
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            // Aqui você pode adicionar a lógica para registrar o usuário
            alert("Usuário registrado com sucesso!");
            drawerRegister.classList.remove("active");
        });

        // Previne o envio do formulário de login
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            // Aqui você pode adicionar a lógica para autenticar o usuário
            alert("Login realizado com sucesso!");
            drawerLogin.classList.remove("active");

            // Redireciona para o dashboard.html
            window.location.href = "dashboard.html";
        });
    });
</script>

</body>

</html>
