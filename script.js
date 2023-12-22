// Fetch data from TVData.json or retrieve from local storage
const storedData = JSON.parse(localStorage.getItem('TVData'));

// Fetch data if local storage is empty
if (!storedData || storedData.length === 0) {
    fetch("TVData.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            updateLocalStorage(data); // Save the fetched data to local storage
            console.log("Fetched Data:", data);
            displayShowsByStatus(data);
        })
        .catch(error => console.error("Fetch Error:", error));
} else {
    console.log("Stored Data:", storedData);
    displayShowsByStatus(storedData);
}

function displayShows(containerId, shows) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content

    shows.forEach(show => {
        const showDiv = document.createElement("div");
        showDiv.classList.add("tv-show");
        showDiv.innerHTML = `
                <h3>${show.title}</h3>
                <p>Genre: ${show.genre}</p>
                <p>Network: ${show.network}</p>
                <a href="showpage.html?show=${encodeURIComponent(JSON.stringify(show))}" target="_blank">View Details</a>
            `;
        container.appendChild(showDiv);
    });
}



function displayShowsByStatus(data) {
    console.log("Displaying shows by status");

    const watchingShows = [];
    const notStartedShows = [];
    const endedShows = [];

    data.forEach(show => {
        let isWatching = false;
        let isEnded = true;

        show.seasons.forEach(season => {
            for (const [seasonKey, episodes] of Object.entries(season)) {
                episodes.forEach(episode => {
                    if (episode.watched) {
                        isWatching = true;
                    } else {
                        isEnded = false;
                    }
                });
            }
        });

        if (isWatching) {
            watchingShows.push(show);
        } else if (isEnded) {
            endedShows.push(show);
        } else {
            notStartedShows.push(show);
        }
    });

    console.log("Watching Shows:", watchingShows);
    console.log("Not Started Shows:", notStartedShows);
    console.log("Ended Shows:", endedShows);

    displayShows("watchingShows", watchingShows);
    displayShows("notStartedShows", notStartedShows);
    displayShows("endedShows", endedShows);
}

function updateLocalStorage(data) {
    localStorage.setItem('TVData', JSON.stringify(data));
}