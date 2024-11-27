<?php
require_once '../config/db.php';

// Listar perguntas
function listarPerguntas($pdo) {
    $stmt = $pdo->prepare("SELECT * FROM perguntas WHERE status = TRUE");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Adicionar pergunta
function adicionarPergunta($pdo, $texto) {
    $stmt = $pdo->prepare("INSERT INTO perguntas (texto) VALUES (:texto)");
    $stmt->execute(['texto' => $texto]);
}

// Editar pergunta
function editarPergunta($pdo, $id, $novoTexto) {
    $stmt = $pdo->prepare("UPDATE perguntas SET texto = :texto WHERE id = :id");
    $stmt->execute(['texto' => $novoTexto, 'id' => $id]);
}

// Excluir pergunta
function excluirPergunta($pdo, $id) {
    $stmt = $pdo->prepare("DELETE FROM perguntas WHERE id = :id");
    $stmt->execute(['id' => $id]);
}
?>
