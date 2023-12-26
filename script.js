// Fetch data from TVData.json or retrieve from local storage
fetch("TVData.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched Data:", data);
        // Save the data to local storage
        localStorage.setItem('tvData', JSON.stringify(data));
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
    const localData = localStorage.getItem("watched")
    const wEpisodes = localData ? localData.split(",") : []
    const watchingShows = [];
    const notStartedShows = [];
    const endedShows = [];

    data.forEach(show => {

        let started = false
        let allEpisodes = []
        show.seasons.forEach(season => {
            const episodes = season.episodes;
            allEpisodes = [...allEpisodes, ...episodes];
        });
        const watched = allEpisodes.filter(episode => {
            const key = `episode_${episode.id}`;
            const isWatched = wEpisodes.some(id => id == key)
            return isWatched
        })
        const allEpisodesWatched = watched.length == allEpisodes.length;
        const watchingEpisodes = watched.length > 0 && !allEpisodesWatched
        if (allEpisodesWatched) {
            endedShows.push(show);
        } else if (watchingEpisodes) {
            // Consider shows with episodes as watching if not all episodes are watched
            watchingShows.push(show);
        } else {
            // Consider shows with no episodes or all episodes watched as ended
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


function isEpisodeWatched(episodeId) {
    return localStorage.getItem(`watched_${episodeId}`) === "true";
}