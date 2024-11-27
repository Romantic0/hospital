<?php
require_once './functions/perguntas.php';
require_once './functions/avaliacoes.php';
require_once './functions/auth.php';

header("Content-Type: application/json");

$action = $_GET['action'] ?? null;

switch ($action) {
    case "listar_perguntas":
        echo json_encode(listarPerguntas($pdo));
        break;
    case "adicionar_pergunta":
        adicionarPergunta($pdo, $_POST['texto']);
        echo json_encode(["success" => true]);
        break;
    case "registrar_avaliacao":
        registrarAvaliacao($pdo, $_POST['pergunta_id'], $_POST['resposta'], $_POST['feedback'] ?? null);
        echo json_encode(["success" => true]);
        break;
    case "listar_avaliacoes":
        echo json_encode(listarAvaliacoes($pdo));
        break;
    default:
        echo json_encode(["error" => "Ação inválida"]);
        break;
}
?>
