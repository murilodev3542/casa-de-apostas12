<?php
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

// Retorna a conexão para uso em outros arquivos
return $conn;
?>
