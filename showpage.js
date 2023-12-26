let showData;

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
        <p>Episodes: ${show.episodesAll}</p>
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
                <button id="watchedButton_${seasonId}_${episode.episodeNumber}">
    Mark ${episode.watched ? 'Unwatched' : 'Watched'}
</button>
            
                <a href="episodepage.html?episode=${encodeURIComponent(JSON.stringify(episode))}" target="_blank">View Episode</a>

            </div>
        `;
        episodesContainer.appendChild(episodeDiv);
        const button = document.getElementById(`watchedButton_${seasonId}_${episode.episodeNumber}`);
        button.addEventListener('click', () => {
            toggleWatched(seasonId, episode.episodeNumber, encodeURIComponent(JSON.stringify(showData)));
        });

    });
}



function toggleWatched(seasonId, episodeNumber, showDataString) {
    console.log('seasonId:', seasonId);
    console.log('episodeNumber:', episodeNumber);
    const showData = JSON.parse(decodeURIComponent(showDataString));
    console.log('Original showData:', showData);
    console.log('Original showData:', showData);

    const season = showData.seasons.find(season => season.id === seasonId);

    if (season) {
        const episode = season.episodes.find(ep => ep.episodeNumber === episodeNumber);

        if (episode) {
            // Toggle the watched status
            episode.watched = !episode.watched;

            // Update the button text
            const button = document.getElementById(`watchedButton_${seasonId}_${episodeNumber}`);
            button.textContent = `Mark ${episode.watched ? 'Unwatched' : 'Watched'}`;
        }

    }
    console.log('Updated showData:', showData);


    // Update your arrays or perform any other necessary updates here
}