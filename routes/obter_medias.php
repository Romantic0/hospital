<?php
// obter_medias.php

// Conexão com o banco de dados
$host = 'localhost';  // Ajuste com as configurações do seu servidor
$db = 'seu_banco_de_dados';
$user = 'seu_usuario';
$password = 'sua_senha';
$dsn = "pgsql:host=$host;dbname=$db";


try {
    $pdo = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Erro ao conectar: ' . $e->getMessage();
    exit;
}

// Consulta para obter as avaliações e médias por pergunta
$query = "
    SELECT p.id AS pergunta_id, p.texto AS pergunta_texto, AVG(a.resposta) AS media
    FROM public.avaliacoes a
    JOIN public.perguntas p ON a.pergunta_id = p.id
    WHERE p.status = true
    GROUP BY p.id
";

$stmt = $pdo->query($query);

// Prepara o resultado em formato JSON
$medias = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $medias[] = $row;
}

// Retorna os dados em JSON
header('Content-Type: application/json');
echo json_encode($medias);
?>

