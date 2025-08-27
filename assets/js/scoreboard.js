document.addEventListener('DOMContentLoaded', async () => {
    const recordsTableContainer = document.getElementById('table-container');
    let analysisData = [];
    let currentSortColumn = 'team';
    let currentSortDirection = 'desc';
                    
    // 取得資料 + Render
    const fetchDataAndRender = async () => {
        recordsTableContainer.innerHTML = '<p class="states">載入中...</p>';
        try {
            const response = await fetch('backend/get_records.php');
            analysisData = await response.json();
                        
            if (response.ok) {
                if (analysisData.length === 0) {
                    recordsTableContainer.innerHTML = '<p class="states">沒有歷史紀錄可供分析</p>';
                    return;
                }
                console.log(analysisData)
                sortTable();
            } else {
                recordsTableContainer.innerHTML = '<p class="states">載入失敗：' + analysisData.message + '</p>';
            }
        } catch (error) {
            console.error('載入歷史紀錄時發生錯誤:', error);
            recordsTableContainer.innerHTML = '<p class="states">網路錯誤，請稍後再試。</p>';
            console.error("FUCK")
        }
    };
                    
    // sort
    const sortTable = () => {
        analysisData.sort((a, b) => {
            const valA = a[currentSortColumn];
            const valB = b[currentSortColumn];
            if (valA < valB) return currentSortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return currentSortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        let tableHTML = `
            <table class="records-table clickable">
                <thead>
                    <tr>
                        <th id="sortable-team" data-column="team">隊伍</th>
                        <th id="sortable-match_count" data-column="match_count">比賽次數</th>
                        <th id="sortable-total_score" data-column="total_score">總分</th>
                        <th id="sortable-avg_total_score" data-column="avg_total_score">平均總分</th>
                        <th id="sortable-avg_coral_score" data-column="avg_coral_score">coral 平均</th>
                        <th id="sortable-avg_algae_score" data-column="avg_algae_score">algae 平均</th>
                    </tr>
                </thead>
                <tbody>
        `;

        analysisData.forEach(row => {
            tableHTML += `
                <tr onclick="window.location='team_detail.php?team=${row.team}'">
                    <td>${row.team}</td>
                    <td>${row.match_count}</td>
                    <td>${row.total_score}</td>
                    <td>${row.avg_total_score}</td>
                    <td>${row.avg_coral_score}</td>
                    <td>${row.avg_algae_score}</td>
                </tr>
            `;
        });
        tableHTML += `
                </tbody>
            </table>
        `;
        recordsTableContainer.innerHTML = tableHTML;
                        
        const sortableHeaders = document.querySelectorAll('.records-table th[data-column]');
        sortableHeaders.forEach(header => {
            header.classList.add('sort-icon');
            if (header.dataset.column === currentSortColumn) {
                header.classList.add('active-sort');
                header.classList.toggle('sort-asc', currentSortDirection === 'asc');
                header.classList.toggle('sort-desc', currentSortDirection === 'desc');
            } else {
                header.classList.remove('active-sort', 'sort-asc', 'sort-desc');
            }
                            
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                if (column === currentSortColumn) {
                    currentSortDirection = (currentSortDirection === 'asc') ? 'desc' : 'asc';
                } else {
                    currentSortColumn = column;
                    currentSortDirection = 'desc';
                }
                sortTable();
            });
        });
    };
    fetchDataAndRender();
});