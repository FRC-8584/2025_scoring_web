document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('team');
    const teamTitle = document.getElementById('team-title');
    const recordsTableContainer = document.getElementById('records-table-container');

    if (teamId) {
        teamTitle.textContent = `- ${teamId} -`;
        fetchTeamRecords(teamId);
    } else {
        recordsTableContainer.innerHTML = '<p class="states">未指定隊伍號</p>';
    }

    recordsTableContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const recordId = e.target.dataset.id;
            if (confirm(`確定要刪除這筆紀錄嗎？`)) {
                await deleteRecord(recordId);
            }
        }
    });

    async function fetchTeamRecords(id) {
        recordsTableContainer.innerHTML = '<p class="states">載入中...</p>';
        try {
            const response = await fetch(`backend/get_team_records.php?team_id=${id}`);
            const records = await response.json();

            if (response.ok) {
                if (records.length === 0) {
                    recordsTableContainer.innerHTML = '<p class="states">此隊伍目前沒有任何紀錄</p>';
                    return;
                }
                let tableHTML = `
                    <table class="records-table">
                        <thead>
                            <tr>
                                <th>Match</th>
                                <th>Leave</th>
                                <th>Auto</th>
                                <th>Teleop</th>
                                <th>Barge</th>
                                <th>Score</th>
                                <th>Remark</th> 
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                records.forEach(record => {
                    const autoScore = `Coral: ${record.auto_l4+record.auto_l3+record.auto_l2+record.auto_l1}\nProcessor: ${record.auto_processor}\nNet: ${record.auto_net}`;
                    const teleopScore = `Coral: ${record.teleop_l4+record.teleop_l3+record.teleop_l2+record.teleop_l1}\nProcessor: ${record.teleop_processor}\nNet: ${record.teleop_net}`;
                    const totalScore = calculateTotalScore(record);
                    const formattedDate = new Date(record.created_at).toLocaleString();

                    tableHTML += `
                        <tr>
                            <td>${record.match_id}</td>
                            <td>${record.start_line_left}</td>
                            <td>${autoScore}</td>
                            <td>${teleopScore}</td>
                            <td>${record.teleop_barge}</td>
                            <td>${totalScore}</td>
                            <td>${formattedDate}</td>
                            <td>${record.remark || '無'}</td> <td><button class="delete-btn" data-id="${record.id}">刪除</button></td>
                        </tr>
                    `;
                });
            } 
            else {
                recordsTableContainer.innerHTML = '<p class="states">載入失敗：' + records.message + '</p>';
            }
        }
        catch(error) {
            console.error('載入紀錄時發生錯誤:', error);
            recordsTableContainer.innerHTML = '<p class="states">網路錯誤，請稍後再試</p>';
        }
    }

    async function deleteRecord(recordId) {
        try {
            const response = await fetch('backend/delete_record.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: recordId })
            });

            const result = await response.json();

            if (response.ok) {
                alert('刪除成功！');
                fetchTeamRecords(teamId); // 重新載入列表
            } else {
                alert('刪除失敗：' + result.message);
            }
        } catch (error) {
            console.error('刪除時發生錯誤:', error);
            alert('網路錯誤，請稍後再試');
        }
    }

    function calculateTotalScore(record) {
        let totalScore = 0;
        if (record.start_line_left === 'yes') { totalScore += 3; }
        totalScore += record.auto_1 * 3 + record.auto_2 * 4 + record.auto_3 * 6 + record.auto_4 * 7;
        totalScore += record.auto_processor * 6 + record.auto_net * 4;
        totalScore += record.teleop_L1 * 2 + record.teleop_L2 * 3 + record.teleop_L3 * 4 + record.teleop_L4 * 5;
        totalScore += record.teleop_processor * 6 + record.teleop_net * 4;
        const bargeScores = { 'none': 0, 'park': 2, 'shallow': 6, 'deep': 12 };
        totalScore += bargeScores[record.teleop_barge] || 0;
        return totalScore;
    }
})