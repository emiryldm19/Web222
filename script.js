function fetchRaceSchedule() {
    var year = document.getElementById('yearInput').value;
    var apiUrl = `https://ergast.com/api/f1/${year}.json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const races = data.MRData.RaceTable.Races;
            if (races.length > 0) {
                displayRaceSchedule(races);
                document.getElementById('resultsTable').style.display = 'table';
            } else {
                document.getElementById('resultsTable').style.display = 'none';
                alert('No races found for this year');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch race data');
        });
}

function displayRaceSchedule(races) {
    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    races.forEach(race => {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = race.season;
        row.insertCell(1).textContent = race.round;
        row.insertCell(2).textContent = race.raceName;
        row.insertCell(3).textContent = race.date;
        row.insertCell(4).textContent = race.time || 'N/A';
        row.insertCell(5).textContent = race.Circuit.Location.country;
        row.insertCell(6).innerHTML = `<a href="${race.url}" target="_blank">View Details</a>`;
    });
}
