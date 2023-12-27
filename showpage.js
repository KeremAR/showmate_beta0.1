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
        <button onclick="markAllWatched('${show.id}')">Mark Watched</button>

    `;
}


function displaySeasons(seasons) {
    const seasonsContainer = document.getElementById("seasons");

    seasons.forEach((season, seasonIndex) => {
        const seasonDiv = document.createElement("div");
        seasonDiv.classList.add("season");
        seasonDiv.innerHTML = `
            <h3>${season.season}</h3>
            <div class="episodes-container" id="season-${seasonIndex}">
            <button onclick="markAllWatchedSeason(${seasonIndex})">Mark Watched</button>

            </div>
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

        const key = `episode_${episode.id}`;
        const localData = localStorage.getItem("watched")
        const wEpisodes = localData ? localData.split(",") : []
        const isWatched = wEpisodes.some(id => {
            return id == key
        })

        episodeDiv.innerHTML = `
            <div class="episode-details">
                <h3>${episode.episodeNumber}</h3>
                <h4>${episode.title}</h4>
                <p>${episode.description}</p>
                <p>Air Date: ${episode.airDate}</p>
                <p id="${key}-p">Watched: ${isWatched ? 'Yes' : 'No'}</p>
                <button id="${key}-btn" onclick="toggleWatched('${key}')">Mark ${isWatched ? 'Unwatched' : 'Watched'}</button>
                <a href="episodepage.html?episode=${encodeURIComponent(JSON.stringify(episode))}" target="_blank">View Episode</a>
            </div>
        `;
        episodesContainer.appendChild(episodeDiv);
    });
}

function markAllWatchedSeason(seasonIndex) {
    const show = showData; // Use the global showData variable
    const season = show.seasons[seasonIndex];

    season.episodes.forEach(episode => {
        const key = `episode_${episode.id}`;
        toggleWatched(key);
    });

    // After marking all episodes as watched, update the show's segment
    updateShowSegment(show);
}

function toggleWatchedSeason(show) {
    show.seasons.forEach(season => {
        season.episodes.forEach(episode => {
            const key = `episode_${episode.id}`;
            toggleWatched(key);
        });
    });
    // After marking all episodes as watched, update the show's segment
    updateShowSegment(show);
}

function updateShowSegment(show) {
    const localData = localStorage.getItem("watched");
    const wEpisodes = localData ? localData.split(",") : [];

    let allEpisodesWatched = true;

    show.seasons.forEach(season => {
        season.episodes.forEach(episode => {
            const key = `episode_${episode.id}`;
            if (!wEpisodes.includes(key)) {
                allEpisodesWatched = false;
            }
        });
    });

    if (allEpisodesWatched) {
        // Move the show to the "Ended" segment
        moveShowToEnded(show);
    } else {
        // Move the show to the "Watching" segment
        moveShowToWatching(show);
    }
}

function moveShowToEnded(show) {
    const localData = localStorage.getItem("watched");
    let currentWatchingShows = localData ? localData.split(",") : [];

    // Remove the show from the "Watching" segment
    currentWatchingShows = currentWatchingShows.filter(showId => showId !== `show_${show.id}`);

    // Add the show to the "Ended" segment
    const currentEndedShows = localStorage.getItem("ended") ? localStorage.getItem("ended").split(",") : [];
    const newEndedShows = [...currentEndedShows, `show_${show.id}`];
    localStorage.setItem("ended", newEndedShows.join(","));


}

function moveShowToWatching(show) {
    const localData = localStorage.getItem("watched");
    let currentEndedShows = localData ? localData.split(",") : [];

    // Remove the show from the "Ended" segment
    currentEndedShows = currentEndedShows.filter(showId => showId !== `show_${show.id}`);

    // Add the show to the "Watching" segment
    const currentWatchingShows = localStorage.getItem("watching") ? localStorage.getItem("watching").split(",") : [];
    const newWatchingShows = [...currentWatchingShows, `show_${show.id}`];
    localStorage.setItem("watching", newWatchingShows.join(","));


}


function toggleWatched(key) {
    const localData = localStorage.getItem("watched")
    let currentWatchedEpisodes = localData ? localData.split(",") : []

    const isWatched = currentWatchedEpisodes.some(id => {
        return id == key
    })
    if (isWatched) {
        localStorage.setItem("watched", currentWatchedEpisodes.filter(id => id != key).join(","));

    } else {
        const newItem = [...currentWatchedEpisodes, key]
        localStorage.setItem('watched', newItem.join(","));

    }

    // Update the button text using the key
    updateButtonText(key, !isWatched);
}

function updateButtonText(key, isWatched) {
    // Update the button text
    const button = document.getElementById(`${key}-btn`)
    const p = document.getElementById(`${key}-p`)

    if (button) {
        button.textContent = `Mark ${isWatched ? 'Unwatched' : 'Watched'}`
    }
    if (p) {
        p.textContent = `Watched ${isWatched ? 'Yes' : 'No'}`
    }
}

function markAllWatched(showId) {
    const show = showData; // Use the global showData variable

    show.seasons.forEach(season => {
        season.episodes.forEach(episode => {
            const key = `episode_${episode.id}`;
            toggleWatched(key);
        });
    });

    // After marking all episodes as watched, update the show's segment
    updateShowSegment(show);
}