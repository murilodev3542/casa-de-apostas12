<?php
// Inicia a sessão
session_start();

// Inclui o arquivo de conexão
require 'conecta.php';

// Obtém os dados do formulário
$username = $_POST['username'];
$cpf = $_POST['cpf'];
$celular = $_POST['celular'];
$age = $_POST['age'];
$password = $_POST['password'];

// Verifica se os campos estão preenchidos
if (empty($username) || empty($cpf) || empty($celular) || empty($age) || empty($password)) {
    die("Por favor, preencha todos os campos.");
}

// Verifica se o CPF já está cadastrado
$sql = "SELECT * FROM usuarios WHERE cpf = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cpf);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    die("CPF já cadastrado.");
}

// Criptografa a senha
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Prepara a inserção no banco de dados
$sql = "INSERT INTO usuarios (username, cpf, celular, age, password) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssis", $username, $cpf, $celular, $age, $hashed_password);

if ($stmt->execute()) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro ao cadastrar: " . $stmt->error;
}

// Fecha a conexão
$stmt->close();
$conn->close();
?>