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
        }
        catch(error) {
            console.error('載入紀錄時發生錯誤:', error);
            recordsTableContainer.innerHTML = '<p class="states">網路錯誤，請稍後再試</p>';
        }
    }
})