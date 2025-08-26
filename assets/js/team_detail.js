document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('team');
    const teamTitle = document.getElementById('team-title');
    const recordsTableContainer = document.getElementById('records-table-container');

    if (teamId) {
        teamTitle.textContent = `- ${teamId} -`;
        fetchTeamRecords(teamId);
    } else {
        recordsTableContainer.innerHTML = '<p class="text-center">未指定隊伍號。</p>';
    }
})