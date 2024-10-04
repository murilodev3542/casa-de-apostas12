document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const closeLogin = document.getElementById("closeLogin");
    const closeRegister = document.getElementById("closeRegister");
    const drawerLogin = document.getElementById("drawer-login");
    const drawerRegister = document.getElementById("drawer-register");
    const loginForm = document.getElementById("loginForm");

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

    // Lógica de autenticação ao fazer login
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita o envio do formulário

        const formData = new FormData(this); // Captura os dados do formulário

        // Indicador de carregamento (opcional)
        const loginButton = loginForm.querySelector('button[type="submit"]');
        loginButton.textContent = "Entrando..."; // Altera o texto do botão
        loginButton.disabled = true; // Desabilita o botão

        try {
            const response = await fetch('login.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const result = await response.text(); // Obtém a resposta do servidor

            if (result.includes("Login bem-sucedido")) {
                window.location.href = "dashboard.html"; // Redireciona para dashboard
            } else {
                alert(result); // Exibe mensagem de erro
            }
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            alert("Ocorreu um erro ao tentar fazer login. Tente novamente.");
        } finally {
            loginButton.textContent = "Entrar"; // Restaura o texto do botão
            loginButton.disabled = false; // Reabilita o botão
        }
    });
});
