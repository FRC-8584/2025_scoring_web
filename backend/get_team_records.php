<?php
    require_once 'db_config.php';
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    if (!isset($_GET['team']) || empty($_GET['team'])) {
        http_response_code(400);
        echo json_encode(["message" => "缺少隊伍號碼"]);
        exit();
    }

    $team = $_GET['team'];
    try {
        $sql = "SELECT * FROM scores WHERE team = ? ORDER BY created_at DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$team]);
    
        $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($records);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "資料庫錯誤: " . $e->getMessage()]);
    }
?>