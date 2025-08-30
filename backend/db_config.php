<?php
    $host = 'localhost'; 
    $dbname = 'database'; 
    $username = 'username'; 
    $password = 'password';

    try {
        // ?
        $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
        $pdo = new PDO($dsn, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        die("資料庫連線失敗: " . $e->getMessage());
    }
?>