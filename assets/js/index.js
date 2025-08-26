document.addEventListener("DOMContentLoaded", ()=>{
    // 起跑線
    const startLineBtns = document.querySelectorAll('.btn-leave-yes, .btn-leave-no');
    startLineBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            startLineBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 加減分
    const scoreItems = document.querySelectorAll('.score-item');
    scoreItems.forEach(item => {
        const scoreValueDisplay = item.querySelector('.score-value');
        const plusBtn = item.querySelector('.plus');
        const minusBtn = item.querySelector('.minus');

        let score = 0;

        plusBtn.addEventListener('click', () => {
            score++;
            scoreValueDisplay.textContent = score;
        });

        minusBtn.addEventListener('click', () => {
            if (score > 0) {
                score--;
                scoreValueDisplay.textContent = score;
            }
        });
    });

    // barge 選擇
    const bargeBtns = document.querySelectorAll('.btn-barge');
    bargeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bargeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // submit
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            const data = {
                match_id: parseInt(document.getElementById('match_id').value),
                team: parseInt(document.getElementById('team').value),
                start_line_left: document.querySelector('.btn-leave-yes.active') ? 'yes' : 'no',
                teleop_barge: document.querySelector('.btn-barge.active')?.dataset.bargeOption || 'none',
                remark: document.querySelector('.remark-area').value,
            };

            document.querySelectorAll('.score-item').forEach(item => {
                const fieldName = item.querySelector('.score-value').dataset.scoreFor;
                const score = parseInt(item.querySelector('.score-value').textContent, 10);
                data[fieldName] = score;
            });

            if (!data.match_id || !data.team) {
                alert('請填寫場次與隊伍號！');
                return;
            }  

            console.log(data);

            try {
                const response = await fetch('backend/save_data.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('資料儲存成功！');
                    window.location.reload();
                } else {
                    alert('儲存失敗：' + result.message);
                }
            } catch (error) {
                console.error('發送請求時發生錯誤:', error);
                alert('網路錯誤，請稍後再試。');
            }
        });
    }
    else {
        console.error('找不到 id 為 submitBtn 的按鈕');
    }
});