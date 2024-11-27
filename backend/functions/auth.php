<?php
session_start(); // Inicia a sessão

require_once('../config/db.php'); // Inclui a conexão com o banco de dados

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];  // Recebe o nome de usuário
    $password = $_POST['password'];  // Recebe a senha

    // Verifica se os campos estão preenchidos
    if (empty($username) || empty($password)) {
        $_SESSION['login_error'] = "Usuário e senha são obrigatórios!";
        header("Location: ../login.html");
        exit();
    }

    try {
        // Consulta no banco de dados para verificar o usuário
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE username = :username LIMIT 1");
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verifica se o usuário foi encontrado e se a senha está correta
        if ($user && password_verify($password, $user['password'])) {
            // Se o login for bem-sucedido, armazena o ID do usuário na sessão
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            // Redireciona para o dashboard
            header("Location: ../dashboard.html");
            exit();
        } else {
            // Se as credenciais forem inválidas
            $_SESSION['login_error'] = "Usuário ou senha inválidos!";
            header("Location: ../login.html");
            exit();
        }
    } catch (PDOException $e) {
        // Caso ocorra um erro na consulta ao banco
        $_SESSION['login_error'] = "Erro ao tentar conectar ao banco!";
        header("Location: ../login.html");
        exit();
    }
} else {
    // Redireciona para a tela de login se acessar diretamente o auth.php
    header("Location: ../login.html");
    exit();
}
?>
