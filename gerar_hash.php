<?php
// Substitua 'sua_senha_segura' pela senha que você deseja usar
$senha = 'admin123'; // Exemplo de senha
$hash = password_hash($senha, PASSWORD_BCRYPT);
echo "Hash gerado: " . $hash;
?>