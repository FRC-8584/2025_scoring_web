<!DOCTYPE html>
<html lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>場記</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <script src="assets/js/index.js" defer></script>
    </head>
    <body class="wrapper">
        <header>
            <?php include 'widgets/navbar.php';?>
        </header>
        <main>
            <h2>Info</h2>
            <div class="info-group">
                <div class="info-item">
                    <label for="match_id">場次</label>
                    <input type="number" id="match_id" name="match_id">
                </div>
                <div class="info-item">
                    <label for="team">隊伍</label>
                    <input type="number" id="team" name="team">
                </div>
            </div>
            <!-- Auto -->
            <h2>Auto phase</h2>
            <h3>離開起跑線</h3>
            <div class="btn-group">
                <button class="btn btn-leave-yes">Yes</button>
                <button class="btn btn-leave-no active">No</button>
            </div>
            </br>
            <div class="score-group">
                <div class="score-item">
                    <h3>L4</h3>
                    <div class="score-value" data-score-for="auto_l4">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>L3</h3>
                    <div class="score-value" data-score-for="auto_l3">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>L2</h3>
                    <div class="score-value" data-score-for="auto_l2">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>L1</h3>
                    <div class="score-value" data-score-for="auto_l1">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>Processor</h3>
                    <div class="score-value" data-score-for="auto_processor">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>Net</h3>
                    <div class="score-value" data-score-for="auto_net">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
            </div>
            <!-- Teleop -->
             <h2>Teleop phase</h2>
            <div class="score-group">
                <div class="score-item">
                    <h3>L4</h3>
                    <div class="score-value" data-score-for="teleop_l4">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>L3</h3>
                    <div class="score-value" data-score-for="teleop_l3">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>L2</h3>
                    <div class="score-value" data-score-for="teleop_l2">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>L1</h3>
                    <div class="score-value" data-score-for="teleop_l1">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>Processor</h3>
                    <div class="score-value" data-score-for="teleop_processor">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
                <div class="score-item">
                    <h3>Net</h3>
                    <div class="score-value" data-score-for="teleop_net">0</div>
                    <div class="score-buttons">
                        <button class="score-btn plus">+</button>
                        <button class="score-btn minus">-</button>
                    </div>
                </div>
            </div>
            
            <h3>Barge</h3>
            <div class="btn-group">
                <button class="btn btn-barge active" data-barge-option="none">None</button>
                <button class="btn btn-barge" data-barge-option="park">Park</button>
                <button class="btn btn-barge" data-barge-option="shallow">Shallow</button>
                <button class="btn btn-barge" data-barge-option="deep">Deep</button>
            </div>
            <h2>備註</h2>
            <textarea id="remark" class="remark-area" placeholder="備註"></textarea>
            <div class="btn-group" style="margin-top: 30px;">
                <button id="submitBtn" class="btn btn-submit">儲存</button> 
            </div>
        </main>
    </body>
</html>