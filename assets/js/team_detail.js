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
            const response = await fetch(`backend/get_team_records.php?team=${id}`);
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
                    const autoScore = `
                        Coral: ${parseInt(record.auto_l4)+parseInt(record.auto_l3)+parseInt(record.auto_l2)+parseInt(record.auto_l1)}\n
                        Processor: ${record.auto_processor}\n
                        Net: ${record.auto_net}
                    `;
                    const teleopScore = `
                        Coral: ${parseInt(record.teleop_l4)+parseInt(record.teleop_l3)+parseInt(record.teleop_l2)+parseInt(record.teleop_l1)}\n
                        Processor: ${record.teleop_processor}\n
                        Net: ${record.teleop_net}
                    `;
                    const totalScore = calculateTotalScore(record);
                    const formattedDate = new Date(record.created_at).toLocaleString();

                    tableHTML += `
                        <tr>
                            <td>${record.match_id}</td>
                            <td>${autoScore}</td>
                            <td>${teleopScore}</td>
                            <td>${record.teleop_barge}</td>
                            <td>${totalScore}</td>
                            <td>${record.remark || '無'}</td> 
                            <td><button class="delete-btn" data-id="${record.id}">delete</button></td>
                        </tr>
                    `;
                });

                tableHTML += `
                        </tbody>
                    </table>
                `;
                recordsTableContainer.innerHTML = tableHTML;
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
        totalScore += parseInt(record.auto_l1) * 3 + parseInt(record.auto_l2) * 4 + parseInt(record.auto_l3) * 6 + parseInt(record.auto_l4) * 7;
        totalScore += parseInt(record.auto_processor) * 6 + parseInt(record.auto_net) * 4;
        totalScore += parseInt(record.teleop_l1) * 2 + parseInt(record.teleop_l2) * 3 + parseInt(record.teleop_l3) * 4 + parseInt(record.teleop_l4) * 5;
        totalScore += parseInt(record.teleop_processor) * 6 + parseInt(record.teleop_net) * 4;
        const bargeScores = { 'none': 0, 'park': 2, 'shallow': 6, 'deep': 12 };
        totalScore += bargeScores[record.teleop_barge] || 0;
        return totalScore;
    }
})