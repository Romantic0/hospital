<?php
$host = 'localhost';
$dbname = 'avaliacao_hospital';
$user = 'postgres';
$pass = 'postgres';

try {
    // Conexão com o banco de dados PostgreSQL usando PDO
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $pass);
    // Define o modo de erro para exceções
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Caso ocorra um erro na conexão
    echo 'Erro de conexão: ' . $e->getMessage();
}
?>
