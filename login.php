<?php
session_start();

// Configurações do banco de dados
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'bd_aula';

// Criação da conexão
$conn = new mysqli($host, $user, $password, $dbname);

// Verificação de erro na conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Define o charset para evitar problemas com caracteres especiais
$conn->set_charset("utf8");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $cpf = $_POST['cpf'];
    $password = $_POST['password'];

    // Validação dos dados
    if (empty($cpf) || empty($password)) {
        echo "Todos os campos são obrigatórios.";
        exit;
    }

    // Prepare e execute a consulta
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE cpf = ? LIMIT 1");

    // Verifique se a preparação da declaração falhou
    if (!$stmt) {
        die("Erro na preparação da consulta: " . $conn->error);
    }

    $stmt->bind_param("s", $cpf);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verifique a senha
        if (password_verify($password, $user['password'])) {
            // Login bem-sucedido
            $_SESSION['user_id'] = $user['id']; // Armazene o ID do usuário na sessão
            echo "Login realizado com sucesso!";
            // Redirecionar para a página de dashboard
            header('Location: dashboard.html'); // Altere para o seu arquivo de dashboard
            exit();
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "Usuário não encontrado.";
    }
    $stmt->close();
}

// Fechar a conexão
$conn->close();
?>
