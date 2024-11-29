<?php
require_once '../config/db.php';

$conn = conectarBanco();

$query = "
    SELECT p.id AS pergunta_id, p.texto AS pergunta, AVG(a.resposta) AS media
    FROM perguntas p
    LEFT JOIN avaliacoes a ON p.id = a.pergunta_id
    GROUP BY p.id, p.texto
";
$stmt = $conn->query($query);

$medias = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $medias[] = [
        'pergunta_id' => $row['pergunta_id'],
        'pergunta' => $row['pergunta'],
        'media' => round($row['media'], 2),
    ];
}

echo json_encode($medias);


?>
