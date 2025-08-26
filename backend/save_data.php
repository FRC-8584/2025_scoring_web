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

    $required_fields = ['match_id', 'team', 'start_line_left', 'auto_l4', 'auto_l3', 'auto_l2', 'auto_l1', 'auto_processor', 'auto_net', 'teleop_l4', 'teleop_l3', 'teleop_l2', 'teleop_l1', 'teleop_processor', 'teleop_net', 'teleop_barge', 'remark'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(["message" => "遺漏欄位: $field"]);
            exit();
        }
    }

    try {
        $sql = "INSERT INTO scores (
            match_id, team, start_line_left,
            auto_l4, auto_l3, auto_l2, auto_l1, auto_processor, auto_net,
            teleop_l4, teleop_l3, teleop_l2, teleop_l1, teleop_processor, teleop_net, teleop_barge, 
            remark
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['match_id'],
            $data['team'],
            $data['start_line_left'],
            (int)$data['auto_l4'],
            (int)$data['auto_l3'],
            (int)$data['auto_l2'],
            (int)$data['auto_l1'],
            (int)$data['auto_processor'],
            (int)$data['auto_net'],
            (int)$data['teleop_l4'],
            (int)$data['teleop_l3'],
            (int)$data['teleop_l2'],
            (int)$data['teleop_l1'],
            (int)$data['teleop_processor'],
            (int)$data['teleop_net'],
            $data['teleop_barge'],
            $data['remark']
        ]);

        http_response_code(201);
        echo json_encode(["message" => "資料儲存成功"]);
    }
    catch (PDOException $e) {
        http_response_code(500); 
        echo json_encode(["message" => "資料庫錯誤: " . $e->getMessage()]);
    }
?>