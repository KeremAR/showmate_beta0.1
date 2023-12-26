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
            <div class="episodes-container" id="season-${seasonIndex}">
            <button onclick="toggleWatched('season', ${season.id})">Mark ${season.id in localStorage ? 'Unwatched' : 'Watched'}</button>
            </div>
        `;
        seasonsContainer.appendChild(seasonDiv);

        displayEpisodes(`season-${seasonIndex}`, season.episodes);
    });
}

function displaySeasons(seasons) {
    const seasonsContainer = document.getElementById("seasons");

    seasons.forEach((season, seasonIndex) => {
        const seasonDiv = document.createElement("div");
        seasonDiv.classList.add("season");
        seasonDiv.innerHTML = `
            <h3>${season.season}</h3>
            <div class="episodes-container" id="season-${seasonIndex}">
            <button onclick="toggleWatched('season', ${season.id})">Mark ${season.id in localStorage ? 'Unwatched' : 'Watched'}</button>
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
            console.log(id, key)
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


function toggleWatched(key) {


    console.log(`Toggling ${key}. Was Watched: ${localStorage.getItem(key) === 'watched'}`);
    const localData = localStorage.getItem("watched")
    let currentWatchedEpisodes = localData ? localData.split(",") : []

    const isWatched = currentWatchedEpisodes.some(id => {
        console.log(id, key)
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