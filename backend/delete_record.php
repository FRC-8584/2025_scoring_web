<?php
    require_once 'db_config.php';
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["message" => "不支援的請求方法"]);
        exit();
    }

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "缺少紀錄 ID"]);
        exit();
    }

    try {
        $sql = "DELETE FROM scores WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$data['id']]);
        
        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(["message" => "紀錄刪除成功"]);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "找不到要刪除的紀錄"]);
        }
    
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "資料庫錯誤: " . $e->getMessage()]);
    }
?>