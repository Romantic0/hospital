
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['avaliacoes']) && is_array($data['avaliacoes'])) {
        $conn = conectarBanco();
        $stmt = $conn->prepare("
            INSERT INTO avaliacoes (pergunta_id, resposta, feedback, data_hora) 
            VALUES (:pergunta_id, :resposta, :feedback, NOW())
        ");

        foreach ($data['avaliacoes'] as $avaliacao) {
            $stmt->execute([
                ':pergunta_id' => $avaliacao['pergunta_id'],
                ':resposta' => $avaliacao['resposta'],
                ':feedback' => $data['feedback'],
            ]);
        }

        echo json_encode(["success" => true, "message" => "Avaliações salvas com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Dados inválidos."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método inválido."]);
}


?>
