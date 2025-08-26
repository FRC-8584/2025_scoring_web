<?php
    require_once 'db_config.php';
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    try {
        $sql_command = "SELECT 
            team,
            COUNT(team) AS match_count,
            SUM(
                CASE WHEN start_line_left = 'yes' THEN 3 ELSE 0 END +
                (auto_l1 * 3) + (auto_l2 * 4) + (auto_l3 * 6) + (auto_l4 * 7) +
                (auto_processor * 6) + (auto_net * 4) +
                (teleop_l1 * 2) + (teleop_l2 * 3) + (teleop_l3 * 4) + (teleop_l4 * 5) +
                (teleop_processor * 6) + (teleop_net * 4) +
                CASE teleop_barge
                    WHEN 'park' THEN 2
                    WHEN 'shallow' THEN 6
                    WHEN 'deep' THEN 12
                    ELSE 0
                END
            ) AS total_score,
            SUM(
                (auto_l1 * 3) + (auto_l2 * 4) + (auto_l3 * 6) + (auto_l4 * 7) +
                (teleop_l1 * 2) + (teleop_l2 * 3) + (teleop_l3 * 4) + (teleop_l4 * 5)
            ) AS coral_score,
            SUM(
                (auto_processor * 6) + (auto_net * 4) +
                (teleop_processor * 6) + (teleop_net * 4)
            ) AS algae_score
            FROM
                scores
            GROUP BY
                team
            ORDER BY
                total_score DESC";

        $stmt = $pdo->prepare($sql_command);
        $stmt->execute();
        $analysis_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($analysis_data as &$row) {
            $row['avg_total_score'] = round($row['total_score'] / $row['match_count'], 2);
            $row['avg_coral_score'] = round($row['coral_score'] / $row['match_count'], 2);
            $row['avg_algae_score'] = round($row['algae_score'] / $row['match_count'], 2);
            unset($row['coral_score']);
            unset($row['algae_score']);
        } 

        http_response_code(200);
        echo json_encode($analysis_data);
    }
    catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "資料庫錯誤: " . $e->getMessage()]);
    }
?>