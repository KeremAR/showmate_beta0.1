// Initialize showData with an empty array if it doesn't exist in local storage
let showData = JSON.parse(localStorage.getItem('showData')) || [];

document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const showId = queryParams.get("show");
    const selectedShow = showData.find(show => show.id === showId);

    if (selectedShow) {
        displayShowInfo(selectedShow);
        displaySeasons(selectedShow.seasons);
    } else {
        console.error('Show data not found.');
    }
});

function saveToLocalStorage() {
    // Save the updated showData to local storage
    localStorage.setItem('showData', JSON.stringify(showData));
}

function displayShowInfo(show) {
    const showInfoContainer = document.getElementById("showInfo");
    showInfoContainer.innerHTML = `
        <h2>${show.title}</h2>
        <p>Year: ${show.year}</p>
        <p>Genre: ${show.genre}</p>
        <p>Network: ${show.network}</p>
        <p>Episodes: ${show.episodes}</p>
    `;
}

function displaySeasons(seasons) {
    const seasonsContainer = document.getElementById("seasons");

    seasons.forEach(season => {
        for (const [seasonKey, episodes] of Object.entries(season)) {
            const seasonDiv = document.createElement("div");
            seasonDiv.classList.add("season");
            seasonDiv.innerHTML = `
                <h3>${seasonKey}</h3>
                <div class="episodes-container" id="${seasonKey}"></div>
            `;
            seasonsContainer.appendChild(seasonDiv);

            displayEpisodes(seasonKey, episodes);
        }
    });
}

function displayEpisodes(seasonKey, episodes) {
    const episodesContainer = document.getElementById(seasonKey);

    episodes.forEach(episode => {
        const episodeDiv = document.createElement("div");
        episodeDiv.classList.add("episode");
        episodeDiv.innerHTML = `
            <div class="episode-details">
                <h3>${episode.episodeNumber}</h4>
                <h4>${episode.title}</h4>
                <p>Air Date: ${episode.airDate}</p>
                <p>Watched: ${episode.watched ? 'Yes' : 'No'}</p>
                <button onclick="viewEpisode('${seasonKey}', ${episode.episodeNumber})">View Episode</button>
                <button onclick="markWatched('${seasonKey}', ${episode.episodeNumber})">
                    ${episode.watched ? 'Mark Unwatched' : 'Mark Watched'}
                </button>
            </div>`;
        episodesContainer.appendChild(episodeDiv);
    });
}

function viewEpisode(seasonKey, episodeNumber) {
    const episodeData = getEpisodeData(seasonKey, episodeNumber);
    const queryParams = new URLSearchParams();
    queryParams.set("episode", encodeURIComponent(JSON.stringify(episodeData)));
    window.open(`episodepage.html?${queryParams.toString()}`, "_blank");
}

function markWatched(seasonKey, episodeNumber) {
    const episode = getEpisodeData(seasonKey, episodeNumber);
    episode.watched = !episode.watched;

    // Update the display to reflect the change
    displayEpisodes(seasonKey, getSeasonEpisodes(seasonKey));

    // Save the updated data to local storage
    saveToLocalStorage();
}

function getEpisodeData(seasonKey, episodeNumber) {
    // Retrieve episode data based on seasonKey and episodeNumber from your show data
    // For now, I'll return a placeholder data
    return {
        seasonKey,
        episodeNumber,
        title: `Episode ${episodeNumber}`,
        description: `Description of Episode ${episodeNumber}`,
        airDate: "2023-01-01",
        watched: false
    };
}

function getSeasonEpisodes(seasonKey) {
    // Retrieve episodes based on seasonKey from your show data
    // For now, I'll return a placeholder array
    return [];
}