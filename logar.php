<?php
// Inicia a sessão
session_start();

// Inclui o arquivo de conexão
require 'conecta.php';

// Obtém os dados do formulário
$cpf = $_POST['cpf'];
$password = $_POST['password'];

// Verifica se os campos estão preenchidos
if (empty($cpf) || empty($password)) {
    die("Por favor, preencha todos os campos.");
}

// Prepara a consulta para evitar SQL Injection
$sql = "SELECT * FROM usuarios WHERE cpf = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cpf);
$stmt->execute();
$result = $stmt->get_result();

// Verifica se o CPF existe
if ($result->num_rows === 0) {
    die("CPF não encontrado.");
}

// Obtém os dados do usuário
$user = $result->fetch_assoc();

// Verifica a senha
if (password_verify($password, $user['password'])) {
    // Armazena informações do usuário na sessão
    $_SESSION['username'] = $user['username'];
    $_SESSION['cpf'] = $user['cpf'];
    
    // Redireciona para o dashboard
    header("Location: dashboard.html");
    exit(); // Certifique-se de usar exit após o redirecionamento
} else {
    die("Senha incorreta.");
}