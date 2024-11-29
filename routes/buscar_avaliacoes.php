<?php
// Configuração do banco de dados
$host = 'localhost';
$dbname = 'hospitalweb';
$user = 'postgres';
$pass = 'postgres';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Buscando as avaliações
    $query = "SELECT * FROM avaliacao ORDER BY data DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $avaliacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($avaliacoes);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao conectar com o banco de dados: ' . $e->getMessage()]);
}
?>
