let showData; // Declare in the global scope

document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    showData = JSON.parse(decodeURIComponent(queryParams.get("show")));

    displayShowInfo(showData);
    displaySeasons(showData.seasons);
});

function displayShowInfo(show) {
    const showInfoContainer = document.getElementById("showInfo");
    showInfoContainer.innerHTML = `
        <h2>${show.title}</h2>
        <p>Year: ${show.year}</p>
        <p>Genre: ${show.genre}</p>
        <p>Network: ${show.network}</p>
        <p>Episodes: ${show.episodes}</p>
    `;

    // Update the watched status in the display
    show.seasons.forEach(season => {
        for (const [seasonKey, episodes] of Object.entries(season)) {
            episodes.forEach(episode => {
                const episodeContainer = document.getElementById(`${seasonKey}_${episode.episodeNumber}`);
                if (episodeContainer) {
                    const watchedStatus = episode.watched ? 'Yes' : 'No';
                    episodeContainer.querySelector(".watched-status").innerText = `Watched: ${watchedStatus}`;
                }
            });
        }
    });
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
    <div class="episode-details" id="${seasonKey}_${episode.episodeNumber}">
        <h3>${episode.episodeNumber}</h4>
        <h4>${episode.title}</h4>
        <p>Air Date: ${episode.airDate}</p>
        <p class="watched-status">Watched: ${episode.watched ? 'Yes' : 'No'}</p>
        <button onclick="viewEpisode('${seasonKey}', ${episode.episodeNumber})">View Episode</button>
        <button onclick="markWatched('${seasonKey}', ${episode.episodeNumber})">${episode.watched ? 'Mark Unwatched' : 'Mark Watched'}</button>
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

function markWatched(seasonKey, episodeNumber) {
    // You may want to update your data structure to mark the episode as watched
    console.log(`Marking Season ${seasonKey}, Episode ${episodeNumber} as Watched`);

    // For now, let's assume you have the showData object in the global scope
    const episode = getEpisodeData(showData, seasonKey, episodeNumber);
    episode.watched = !episode.watched;

    // Update the display to reflect the change (you might need to refresh data from local storage or API)
    displayShowInfo(showData);
}