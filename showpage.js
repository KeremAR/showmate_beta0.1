document.addEventListener("DOMContentLoaded", () => {
    const queryParams = new URLSearchParams(window.location.search);
    const showData = JSON.parse(decodeURIComponent(queryParams.get("show")));

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
        <p>Episodes: ${getTotalEpisodes(show.seasons)}</p>
    `;
}

function displaySeasons(seasons) {
    const seasonsContainer = document.getElementById("seasons");

    seasons.forEach((season, seasonIndex) => {
        const seasonDiv = document.createElement("div");
        seasonDiv.classList.add("season");
        seasonDiv.innerHTML = `
            <h3>${season.season}</h3>
            <div class="episodes-container" id="season-${seasonIndex}"></div>
        `;
        seasonsContainer.appendChild(seasonDiv);

        displayEpisodes(`season-${seasonIndex}`, season.episodes);
    });
}

function displayEpisodes(seasonId, episodes) {
    const episodesContainer = document.getElementById(seasonId);

    episodes.forEach(episode => {
        const episodeDiv = document.createElement("div");
        episodeDiv.classList.add("episode");
        episodeDiv.innerHTML = `
            <div class="episode-details">
                <h3>${episode.episodeNumber}</h3>
                <h4>${episode.title}</h4>
                <p>${episode.description}</p>
                <p>Air Date: ${episode.airDate}</p>
                <p>Watched: ${episode.watched ? 'Yes' : 'No'}</p>
                <a href="episodepage.html?episode=${encodeURIComponent(JSON.stringify(episode))}" target="_blank">View Episode</a>

            </div>
        `;
        episodesContainer.appendChild(episodeDiv);
    });
}



function getTotalEpisodes(seasons) {
    return seasons.reduce((total, season) => total + season.episodes.length, 0);
}