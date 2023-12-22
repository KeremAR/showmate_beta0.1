// Fetch data from TVData.json or retrieve from local storage

// Fetch data if local storage is empty
fetch("TVData.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched Data:", data);
        displayShowsByStatus(data);
    })
    .catch(error => console.error("Fetch Error:", error));


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

        show.seasons.forEach(season => {
            for (const [seasonKey, episodes] of Object.entries(season)) {
                // Check if any episode in the season is watched
                const hasWatchedEpisode = episodes.some(episode => episode.watched);

                if (hasWatchedEpisode) {
                    isWatching = true;
                    break; // No need to check other seasons if one is already watched
                }
            }
        });

        if (isWatching) {
            watchingShows.push(show);
        } else if (show.watched) {
            // Move the show to "Ended" if the overall watched status is true
            endedShows.push(show);
        } else if (show.episodes > 0) {
            // Consider shows with episodes as not started if no episode is watched
            notStartedShows.push(show);
        } else {
            // Consider shows with no episodes as ended
            endedShows.push(show);
        }
    });

    console.log("Watching Shows:", watchingShows);
    console.log("Not Started Shows:", notStartedShows);
    console.log("Ended Shows:", endedShows);

    displayShows("watchingShows", watchingShows);
    displayShows("notStartedShows", notStartedShows);
    displayShows("endedShows", endedShows);
}